import { sql } from "drizzle-orm";

import {
  SchemeType,
  InvestmentType,
  CompoundingType,
} from "@app/definitions/enums/schemes";

import { db } from "#db/index";
import schemes from "#db/schemas/schemes";

export default async function seedSchemes() {
  console.log("Seeding Schemes");

  await db
    .insert(schemes)
    .values([
      {
        type: SchemeType.FD,
        investmentType: InvestmentType.LUMP_SUM,
        compoundingType: CompoundingType.QUARTERLY,
      },
      {
        type: SchemeType.RD,
        investmentType: InvestmentType.RECURRING,
        compoundingType: CompoundingType.QUARTERLY,
      },
      {
        type: SchemeType.MIS,
        investmentType: InvestmentType.LUMP_SUM,
        compoundingType: CompoundingType.NONE,
      },
    ])
    .onDuplicateKeyUpdate({
      set: {
        investmentType: sql`VALUES(investment_type)`,
        compoundingType: sql`VALUES(compounding_type)`,
      }
    });

  console.log("Seeded Schemes");
}
