import * as z from "zod";
import { SchemeType } from "@app/definitions/enums/schemes";

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
