/**
 * Calculates the maturity amount for a FD with quarterly compounding.
 *
 * @param principalAmount - The principal amount invested
 * @param tenure - The tenure in months
 * @param interestRate - Annual interest rate in percentage
 *
 * @returns The maturity amount
 */
export default function calculateFD(
  principalAmount: number,
  tenure: number,
  interestRate: number,
): number {
  if (principalAmount < 0) {
    throw new Error("Invalid principal amount");
  }
  if (tenure < 0) {
    throw new Error("Invalid tenure");
  }
  if (interestRate < 0) {
    throw new Error("Invalid interest rate");
  }

  const tenureInYears = tenure / 12;
  const rate = interestRate / 100;
  const maturityAmount = principalAmount * (1 + (rate / 4)) ** (4 * tenureInYears);
  return +maturityAmount.toFixed(2);
}
