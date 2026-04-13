import fs from "fs/promises";
import path from "path";
import Papa from "papaparse";

import {
  schemeRateListSchema,
  SchemeRateList,
} from "@app/schemas/schemes";

import { db } from "#db/index";
import schemeRates from "#db/schemas/schemeRates";
import { PRIVATE_PATH } from "#server/config";

const SEED_FILE_PATH = "scheme-rates.csv" as const;


async function getSchemeRates(): Promise<SchemeRateList> {
  try {
    const schemeRateFilePath = path.join(PRIVATE_PATH, SEED_FILE_PATH);
    const file = await fs.readFile(schemeRateFilePath, "utf8");
    const {
      data,
      errors,
    } = Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
    });
    if (errors.length) {
      throw errors;
    }
    const parsedData = schemeRateListSchema.parse(data);
    return parsedData;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default async function seedSchemeRates() {
  const schemeRatesData = await getSchemeRates();

  console.log("Seeding Scheme Rates");

  await db
    .insert(schemeRates)
    .values(schemeRatesData);

  console.log("Seeded Scheme Rates");
}
