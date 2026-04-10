import { sql } from "drizzle-orm";

import {
  SchemeType,
  InvestmentType,
  CompoundingType,
} from "@app/definitions/enums/schemes";
import { SCHEMES } from "@app/definitions/constants/map";

import { db } from "#db/index";
import schemes from "#db/schemas/schemes";

export default async function seedSchemes() {
  console.log("Seeding Schemes");
  const schemeEntries = Object.entries(SCHEMES)
    .map(([scheme, { investmentType, compoundingType }]) => ({
      type: scheme as SchemeType,
      investmentType,
      compoundingType
    }))

  await db
    .insert(schemes)
    .values(schemeEntries)
    .onDuplicateKeyUpdate({
      set: {
        investmentType: sql`VALUES(investment_type)`,
        compoundingType: sql`VALUES(compounding_type)`,
      }
    });

  console.log("Seeded Schemes");
}
