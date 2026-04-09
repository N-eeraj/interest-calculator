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
  type SchemesSchema,
  type SchemeRateResourceListSchema,
  type CreateInvestmentSchema,
  type InvestmentFilterSchema,
  type InvestmentSchema,
  type InvestmentListSchema,
  type InvestmentIdSchema,
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

const DEFAULT_LIST_OPTIONS: NonNullable<Required<InvestmentFilterSchema>> = {
  page: 1,
  limit: 10,
  sortBy: SortByOption.DATE,
  sortOrder: "desc",
} as const;

export default class InvestmentService {
  static async schemes(): Promise<SchemesSchema> {
    const schemesData = await db
      .select({
        id: schemes.id,
        type: schemes.type,
      })
      .from(schemes);
    return schemesData;
  }

  static async schemeRates(): Promise<SchemeRateResourceListSchema> {
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

    return schemeRatesList as SchemeRateResourceListSchema;
  }

  static async createInvestment(userId: number, {
    investment,
    schemeId,
    tenureMonths,
    isSeniorCitizen = false
  }: CreateInvestmentSchema) {
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
      userId,
      schemeId,
      schemeRateId: matchedSchemeRate.id,
      tenureMonths,
      isSeniorCitizen,
      principalAmount: matchedSchemeRate.investmentType === InvestmentType.LUMP_SUM ? investment: null,
      monthlyDeposit: matchedSchemeRate.investmentType === InvestmentType.RECURRING ? investment: null,
      interestRate,
      maturityAmount,
      monthlyPayout,
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
  }: InvestmentFilterSchema = DEFAULT_LIST_OPTIONS): Promise<InvestmentListSchema> {
    const orderBy = sortOrder === "asc" ? asc : desc;

    const userInvestments = await db
      .select({
        id: investments.id,
        schemeType: schemes.type,
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

  static async getById(userId: number, { id }: InvestmentIdSchema): Promise<InvestmentSchema> {
    const [investment] = await db
      .select({
        id: investments.id,
        schemeType: schemes.type,
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
      .where(and(
        eq(investments.id, id),
        eq(investments.userId, userId),
      ))
      .leftJoin(schemes, eq(schemes.id, investments.schemeId))
      .limit(1);

    if (!investment) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Investment not found",
      });
    }

    const data = investmentSchema.parse(investment);

    return data;
  }

  static async delete(userId: number, { id }: InvestmentIdSchema) {
    const investment = await db
      .select({
        id: investments.id,
      })
      .from(investments)
      .where(and(
        eq(investments.id, id),
        eq(investments.userId, userId),
      ));

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
