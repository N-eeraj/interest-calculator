import { eq } from "drizzle-orm";

import {
  SchemesSchema,
  SchemeRateResourceListSchema,
} from "@app/schemas/schemes";

import { db } from "#db/index";
import {
  schemeRates,
  schemes,
} from "#db/schemas/index";

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
}
