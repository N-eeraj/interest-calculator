export interface SchemeRates {
  tenureMonths: number;
  regularRate: number;
  seniorRate: number;
}

type RateType = "regularRate" | "seniorRate";

interface TenureRateMap {
  [tenureMonths: SchemeRates["tenureMonths"]]: {
    regularRate: SchemeRates["regularRate"];
    seniorRate: SchemeRates["seniorRate"];
  };
}

/**
 * Resolves the applicable interest rate from a list of scheme rates based on tenure and senior status.
 * 
 * @param schemeRates - Array of scheme rate objects, each containing tenure ranges and rates
 * @param tenure - Tenure in months
 * @param isSenior - Whether the applicant is a senior citizen
 * 
 * @returns The applicable interest rate
 */
export default function resolveInterestRate(
  schemeRates: Array<SchemeRates>,
  tenure: number,
  isSenior: boolean,
): SchemeRates[RateType] {
  let tenureRateMap: TenureRateMap = {};
  let matchedTenure: SchemeRates["tenureMonths"] | null = null;
  const rateType: RateType = isSenior ? "seniorRate" : "regularRate";

  for (let { tenureMonths, ...rates } of schemeRates) {
    if (tenureMonths === tenure) {
      return rates[rateType];
    }

    if (tenureMonths < tenure) {
      if (matchedTenure === null) {
        matchedTenure = tenureMonths;
      } else if (tenureMonths > matchedTenure) {
        matchedTenure = tenureMonths;
      }
    }

    tenureRateMap[tenureMonths] = rates;
  }

  if (matchedTenure) {
    return tenureRateMap[matchedTenure][rateType];
  }

  throw new Error("Unable to find rates");
}
