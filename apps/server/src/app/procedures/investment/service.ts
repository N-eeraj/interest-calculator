import { db } from "#db/index";
import schemeRates from "#db/schemas/schemeRates";

import { SchemeRateResourceListSchema } from "@app/schemas/schemes";

export default class InvestmentService {
  static async schemeRates(): Promise<SchemeRateResourceListSchema> {
    const schemeRatesList = await db
      .select({
        id: schemeRates.id,
        schemeId: schemeRates.schemeId,
        regularRate: schemeRates.regularRate,
        seniorRate: schemeRates.seniorRate,
        tenureMonths: schemeRates.tenureMonths,
      })
      .from(schemeRates);

    return schemeRatesList;
  }
}
