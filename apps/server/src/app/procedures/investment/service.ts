import {
  eq,
  asc,
  desc,
  and,
} from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import {
  investmentSchema,
  investmentListSchema,
  investmentMinMaxSchema,
  type Schemes,
  type SchemeRateResourceList,
  type CreateInvestment,
  type InvestmentFilter,
  type Investment,
  type InvestmentList,
  type InvestmentId,
  type UpdateInvestment,
  type InvestmentMinMax,
} from "@app/schemas/schemes";
import {
  getMatchedMonths,
  resolveInterestRate,
} from "@app/utils/resolveInterestRate";
import calculateFD from "@app/utils/calculateFD";
import calculateRD from "@app/utils/calculateRD";
import calculateMIS from "@app/utils/calculateMIS";
import {
  SchemeType,
  InvestmentType,
} from "@app/definitions/enums/schemes";
import { SortByOption } from "@app/definitions/enums/sort";

import { db } from "#db/index";
import {
  investments,
  schemeRates,
  schemes,
} from "#db/schemas/index";

type SchemeData = Omit<typeof investments.$inferInsert, "userId"> & { schemeType: SchemeType };

const DEFAULT_LIST_OPTIONS: NonNullable<Required<InvestmentFilter>> = {
  page: 1,
  limit: 10,
  sortBy: SortByOption.DATE,
  sortOrder: "desc",
} as const;

export default class InvestmentService {
  static async schemeList(): Promise<Schemes> {
    const schemesData = await db
      .select({
        id: schemes.id,
        type: schemes.type,
      })
      .from(schemes);
    return schemesData;
  }

  static async schemeRates(): Promise<SchemeRateResourceList> {
    const schemeRatesList = await db
      .select({
        id: schemeRates.id,
        scheme: schemes.type,
        schemeId: schemeRates.schemeId,
        regularRate: schemeRates.regularRate,
        seniorRate: schemeRates.seniorRate,
        tenureMonths: schemeRates.tenureMonths,
      })
      .from(schemeRates)
      .leftJoin(schemes, eq(schemes.id, schemeRates.schemeId));

    return schemeRatesList as SchemeRateResourceList;
  }

  private static async getSchemeData({
    investment,
    schemeId,
    tenureMonths,
    isSeniorCitizen = false,
  }: CreateInvestment): Promise<SchemeData> {
    const schemeRatesByScheme = await db
      .select({
        id: schemeRates.id,
        tenureMonths: schemeRates.tenureMonths,
        regularRate: schemeRates.regularRate,
        seniorRate: schemeRates.seniorRate,
        schemeType: schemes.type,
        investmentType: schemes.investmentType,
      })
      .from(schemeRates)
      .where(eq(schemeRates.schemeId, schemeId))
      .leftJoin(schemes, eq(schemes.id, schemeRates.schemeId));

    const matchedTenure = getMatchedMonths(
      schemeRatesByScheme.map(({ tenureMonths }) => tenureMonths),
      tenureMonths,
    );

    if (!matchedTenure) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid tenure",
      });
    }

    const matchedSchemeRate = schemeRatesByScheme.find(({ tenureMonths }) => tenureMonths === matchedTenure);
    if (!matchedSchemeRate) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid tenure",
      });
    }

    const interestRate = resolveInterestRate(schemeRatesByScheme, tenureMonths, isSeniorCitizen);

    let maturityAmount = null;
    let monthlyPayout = null;
    switch (matchedSchemeRate.schemeType) {
      case SchemeType.FD:
        const calculatedFD = calculateFD(investment, tenureMonths, interestRate);
        maturityAmount = calculatedFD.maturityAmount;
        break;
      case SchemeType.RD:
        const calculatedRD = calculateRD(investment, tenureMonths, interestRate);
        maturityAmount = calculatedRD.maturityAmount;
        break;
      case SchemeType.MIS:
        const calculatedMIS = calculateMIS(investment, tenureMonths, interestRate);
        maturityAmount = investment;
        monthlyPayout = calculatedMIS.monthlyPayout;
        break;
    }

    const investmentData = {
      schemeType: matchedSchemeRate.schemeType,
      schemeId,
      schemeRateId: matchedSchemeRate.id,
      tenureMonths,
      isSeniorCitizen,
      principalAmount: matchedSchemeRate.investmentType === InvestmentType.LUMP_SUM ? investment: null,
      monthlyDeposit: matchedSchemeRate.investmentType === InvestmentType.RECURRING ? investment: null,
      interestRate,
      maturityAmount,
      monthlyPayout,
    };

    return investmentData as SchemeData;
  }

  private static validateInvestmentMinMax(input: InvestmentMinMax) {
    const {
      error,
    } = investmentMinMaxSchema.safeParse(input);
    if (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: error,
      });
    }
  }

  private static byIdAndUser(investmentId: Investment["id"], userId: number) {
    return and(
      eq(investments.id, investmentId),
      eq(investments.userId, userId),
    )
  }

  static async create(userId: number, {
    investment,
    schemeId,
    tenureMonths,
    isSeniorCitizen = false,
  }: CreateInvestment) {
    const schemeData = await this.getSchemeData({
      investment,
      schemeId,
      tenureMonths,
      isSeniorCitizen,
    });
    
    this.validateInvestmentMinMax({
      scheme: schemeData.schemeType,
      tenureMonths,
      investment,
    });

    const investmentData = {
      ...schemeData,
      userId,
    } as typeof investments.$inferInsert;

    await db
      .insert(investments)
      .values(investmentData);
  }

  static async list(userId: number, {
    page = DEFAULT_LIST_OPTIONS.page,
    limit = DEFAULT_LIST_OPTIONS.limit,
    sortBy = DEFAULT_LIST_OPTIONS.sortBy,
    sortOrder = DEFAULT_LIST_OPTIONS.sortOrder,
  }: InvestmentFilter = DEFAULT_LIST_OPTIONS): Promise<InvestmentList> {
    const orderBy = sortOrder === "asc" ? asc : desc;

    const userInvestments = await db
      .select({
        id: investments.id,
        schemeType: schemes.type,
        investmentType: schemes.investmentType,
        compoundingType: schemes.compoundingType,
        tenureMonths: investments.tenureMonths,
        isSeniorCitizen: investments.isSeniorCitizen,
        principalAmount: investments.principalAmount,
        monthlyDeposit: investments.monthlyDeposit,
        interestRate: investments.interestRate,
        maturityAmount: investments.maturityAmount,
        monthlyPayout: investments.monthlyPayout,
        updatedAt: investments.updatedAt,
      })
      .from(investments)
      .where(eq(investments.userId, userId))
      .leftJoin(schemes, eq(schemes.id, investments.schemeId))
      .orderBy(orderBy(investments[sortBy]))
      .offset(limit * (page - 1))
      .limit(limit);

    const data = investmentListSchema.parse(userInvestments);
    return data;
  }

  static async getById(userId: number, { id }: InvestmentId): Promise<Investment> {
    const [investment] = await db
      .select({
        id: investments.id,
        schemeType: schemes.type,
        investmentType: schemes.investmentType,
        compoundingType: schemes.compoundingType,
        tenureMonths: investments.tenureMonths,
        isSeniorCitizen: investments.isSeniorCitizen,
        principalAmount: investments.principalAmount,
        monthlyDeposit: investments.monthlyDeposit,
        interestRate: investments.interestRate,
        maturityAmount: investments.maturityAmount,
        monthlyPayout: investments.monthlyPayout,
        updatedAt: investments.updatedAt,
      })
      .from(investments)
      .where(this.byIdAndUser(id, userId))
      .leftJoin(schemes, eq(schemes.id, investments.schemeId));

    if (!investment) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Investment not found",
      });
    }

    const data = investmentSchema.parse(investment);

    return data;
  }

  static async update(userId: number, {
    id,
    investment,
    schemeId,
    tenureMonths,
    isSeniorCitizen = false,
  }: UpdateInvestment) {
    const [currentInvestment] = await db
      .select({
        id: investments.id,
      })
      .from(investments)
      .where(this.byIdAndUser(id, userId));

    if (!currentInvestment) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Investment not found",
      });
    }

    const schemeData = await this.getSchemeData({
      investment,
      schemeId,
      tenureMonths,
      isSeniorCitizen,
    });
    
    this.validateInvestmentMinMax({
      scheme: schemeData.schemeType,
      tenureMonths,
      investment,
    });

    const investmentData = {
      ...schemeData,
      userId,
    } as typeof investments.$inferInsert;

    await db
      .update(investments)
      .set({
        ...currentInvestment,
        ...investmentData,
      })
      .where(this.byIdAndUser(id, userId));
  }

  static async delete(userId: number, { id }: InvestmentId) {
    const investment = await db
      .select({
        id: investments.id,
      })
      .from(investments)
      .where(this.byIdAndUser(id, userId));

    if (!investment.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Investment not found",
      });
    }

    await db
      .delete(investments)
      .where(eq(investments.id, id));
  }
}
