import { eq } from "drizzle-orm";

import { SchemeRateResourceListSchema } from "@app/schemas/schemes";

import { db } from "#db/index";
import {
  schemeRates,
  schemes,
} from "#db/schemas/index";

export default class InvestmentService {
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
