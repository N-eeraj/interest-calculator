import * as z from "zod";
import {
  SchemeType,
  InvestmentType,
  CompoundingType,
} from "@app/definitions/enums/schemes";
import { SortByOption } from "@app/definitions/enums/sort";
import {
  INVESTMENT_INTERVALS,
  MIN_INVESTMENT_AMOUNT,
  MAX_INVESTMENT_AMOUNT,
} from "@app/definitions/constants/scheme/amounts";
import {
  TENURE_MONTHS_INTERVALS,
  MIN_TENURE_MONTHS,
  MAX_TENURE_MONTHS,
} from "@app/definitions/constants/scheme/tenures";
import { INVESTMENT } from "#messages";

export const schemesSchema = z.array(
  z.object({
    id: z.number(),
    type: z.enum(SchemeType),
  })
);
export type Schemes = z.infer<typeof schemesSchema>;

export const schemeRateSchema = z.object({
  schemeId: z.coerce.number(),
  tenureMonths: z.coerce.number(),
  regularRate: z.coerce.number(),
  seniorRate: z.coerce.number(),
});
export type SchemeRate = z.infer<typeof schemeRateSchema>;

export const schemeRateResourceSchema = schemeRateSchema.extend({
  id: z.number(),
  scheme: z.enum(SchemeType),
});
export type SchemeRateResource = z.infer<typeof schemeRateResourceSchema>;

export const schemeRateListSchema = z.array(schemeRateSchema);
export type SchemeRateList = z.infer<typeof schemeRateListSchema>;

export const schemeRateResourceListSchema = z.array(schemeRateResourceSchema);
export type SchemeRateResourceList = z.infer<typeof schemeRateResourceListSchema>;

export const investmentMinMaxSchema = z.object({
  scheme: z.enum(SchemeType),
  tenureMonths: z.number(),
  investment: z.number(),
})
  .superRefine(({ scheme, tenureMonths, investment }, ctx) => {
    const minInvestmentAmount = MIN_INVESTMENT_AMOUNT[scheme];
    const maxInvestmentAmount = MAX_INVESTMENT_AMOUNT[scheme];
    const minTenureMonths = MIN_TENURE_MONTHS[scheme];
    const maxTenureMonths = MAX_TENURE_MONTHS[scheme];

    if (tenureMonths < minTenureMonths) {
      ctx.addIssue({
        code: "custom",
        path: ["tenureMonths"],
        message: INVESTMENT.minMax.tenureMonths.min,
      });
    } else if (tenureMonths > maxTenureMonths) {
      ctx.addIssue({
        code: "custom",
        path: ["tenureMonths"],
        message: INVESTMENT.minMax.tenureMonths.max,
      });
    }

    if (investment < minInvestmentAmount) {
      ctx.addIssue({
        code: "custom",
        path: ["investment"],
        message: INVESTMENT.minMax.investment.min,
      });
    } else if (investment > maxInvestmentAmount) {
      ctx.addIssue({
        code: "custom",
        path: ["investment"],
        message: INVESTMENT.minMax.investment.max,
      });
    }
  });
export type InvestmentMinMax = z.infer<typeof investmentMinMaxSchema>;

export const createInvestmentSchema = z.object({
  schemeId: z.number({ error: INVESTMENT.create.schemeId.required }),
  investment: z.number({ error: INVESTMENT.create.investment.valid })
    .multipleOf(INVESTMENT_INTERVALS, { error: INVESTMENT.create.investment.step }),
  tenureMonths: z.number({ error: INVESTMENT.create.tenureMonths.required })
    .multipleOf(TENURE_MONTHS_INTERVALS, { error: INVESTMENT.create.tenureMonths.step }),
  isSeniorCitizen: z.boolean({ error: INVESTMENT.create.isSeniorCitizen.valid })
    .optional(),
});
export type CreateInvestment = z.infer<typeof createInvestmentSchema>;

export const investmentFilterSchema = z.object({
  page: z.number()
    .optional(),
  limit: z.number()
    .optional(),
  sortBy: z.enum(SortByOption)
    .optional(),
  sortOrder: z.literal([
    "asc",
    "desc",
  ])
    .optional(),
}).optional();
export type InvestmentFilter = z.infer<typeof investmentFilterSchema>;

export const investmentSchema = z.object({
  id: z.number(),
  schemeType: z.enum(SchemeType),
  investmentType: z.enum(InvestmentType),
  compoundingType: z.enum(CompoundingType),
  tenureMonths: z.number(),
  isSeniorCitizen: z.boolean()
    .nullable(),
  principalAmount: z.number()
    .nullable(),
  monthlyDeposit: z.number()
    .nullable(),
  interestRate: z.number(),
  maturityAmount: z.number(),
  monthlyPayout: z.number()
    .nullable(),
  updatedAt: z.date(),
});
export type Investment = z.infer<typeof investmentSchema>;

export const investmentListSchema = z.array(investmentSchema);
export type InvestmentList = z.infer<typeof investmentListSchema>;

export const investmentIdSchema = investmentSchema.pick({
  id: true,
});
export type InvestmentId = z.infer<typeof investmentIdSchema>;

export const updateInvestmentSchema = createInvestmentSchema.extend(investmentIdSchema.shape);
export type UpdateInvestment = z.infer<typeof updateInvestmentSchema>;
