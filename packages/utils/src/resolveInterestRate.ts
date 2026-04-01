export interface SchemeRates {
  tenureMonths: number;
  regularRate: number;
  seniorRate: number;
}

type RateType = "regularRate" | "seniorRate";

/**
 * Returns the applicable scheme tenure month for the given tenure.
 * 
 * @param schemeMonths - Array of months of a scheme
 * @param tenure - Tenure in months
 * 
 * @returns The matched scheme month
 */
export function getMatchedMonths(
  schemeMonths: Array<SchemeRates["tenureMonths"]>,
  tenure: number,
): SchemeRates["tenureMonths"] | null {
  let matchedTenure: SchemeRates["tenureMonths"] | null = null;

  for (let tenureMonths of schemeMonths) {
    if (tenureMonths === tenure) return tenureMonths;

    if (tenureMonths < tenure) {
      if (matchedTenure === null) {
        matchedTenure = tenureMonths;
      } else if (tenureMonths > matchedTenure) {
        matchedTenure = tenureMonths;
      }
    }
  }

  return matchedTenure;
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
export function resolveInterestRate(
  schemeRates: Array<SchemeRates>,
  tenure: number,
  isSenior: boolean,
): SchemeRates[RateType] {
  const rateType: RateType = isSenior ? "seniorRate" : "regularRate";

  const matchedTenure = getMatchedMonths(schemeRates.map(({ tenureMonths }) => tenureMonths), tenure);

  for (let { tenureMonths, ...rate } of schemeRates) {
    if (tenureMonths === matchedTenure) return rate[rateType];
  }

  throw new Error("Unable to find rates");
}
