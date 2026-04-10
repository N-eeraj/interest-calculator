import * as z from "zod";
import {
  SchemeType,
  InvestmentType,
  CompoundingType,
} from "@app/definitions/enums/schemes";
import { SortByOption } from "@app/definitions/enums/sort";
import { INVESTMENT } from "#messages";

export const schemesSchema = z.array(
  z.object({
    id: z.number(),
    type: z.enum(SchemeType),
  })
);
export type SchemesSchema = z.infer<typeof schemesSchema>;

export const schemeRateSchema = z.object({
  schemeId: z.coerce.number(),
  tenureMonths: z.coerce.number(),
  regularRate: z.coerce.number(),
  seniorRate: z.coerce.number(),
});
export type SchemeRateSchema = z.infer<typeof schemeRateSchema>;

export const schemeRateResourceSchema = schemeRateSchema.extend({
  id: z.number(),
  scheme: z.enum(SchemeType),
});
export type SchemeRateResourceSchema = z.infer<typeof schemeRateResourceSchema>;

export const schemeRateListSchema = z.array(schemeRateSchema);
export type SchemeRateListSchema = z.infer<typeof schemeRateListSchema>;

export const schemeRateResourceListSchema = z.array(schemeRateResourceSchema);
export type SchemeRateResourceListSchema = z.infer<typeof schemeRateResourceListSchema>;

export const createInvestmentSchema = z.object({
  schemeId: z.number({ error: INVESTMENT.create.schemeId.required }),
  tenureMonths: z.number({ error: INVESTMENT.create.tenureMonths.required }),
  isSeniorCitizen: z.boolean({ error: INVESTMENT.create.isSeniorCitizen.valid })
    .optional(),
  investment: z.number({ error: INVESTMENT.create.investment.valid }),
});
export type CreateInvestmentSchema = z.infer<typeof createInvestmentSchema>;

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
export type InvestmentFilterSchema = z.infer<typeof investmentFilterSchema>;

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
export type InvestmentSchema = z.infer<typeof investmentSchema>;

export const investmentListSchema = z.array(investmentSchema);
export type InvestmentListSchema = z.infer<typeof investmentListSchema>;

export const investmentIdSchema = investmentSchema.pick({
  id: true,
});
export type InvestmentIdSchema = z.infer<typeof investmentIdSchema>;

export const updateInvestmentSchema = createInvestmentSchema.extend(investmentIdSchema.shape);
export type UpdateInvestmentSchema = z.infer<typeof updateInvestmentSchema>;
