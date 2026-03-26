import * as z from "zod";

export const schemeRateSchema = z.object({
  schemeId: z.coerce.number(),
  tenureMonths: z.coerce.number(),
  regularRate: z.coerce.number(),
  seniorRate: z.coerce.number(),
});
export type SchemeRateSchema = z.infer<typeof schemeRateSchema>;

export const schemeRateListSchema = z.array(schemeRateSchema);
export type SchemeRateListSchema = z.infer<typeof schemeRateListSchema>;
