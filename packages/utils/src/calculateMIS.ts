interface Returns {
  monthlyPayout: number;
  totalReturns: number;
}

/**
 * Calculates the monthly payout and total returns for a MIS.
 *
 * @param principalAmount - The principal amount invested
 * @param tenure - The tenure in months
 * @param interestRate - Annual interest rate in percentage
 *
 * @returns The monthly payout and total returns
 */
export default function calculateMIS(
  principalAmount: number,
  tenure: number,
  interestRate: number,
): Returns {
  if (principalAmount < 0) {
    throw new Error("Invalid principal amount");
  }
  if (tenure < 0) {
    throw new Error("Invalid tenure");
  }
  if (interestRate < 0) {
    throw new Error("Invalid interest rate");
  }

  const monthlyPayout = +(principalAmount * interestRate / 1200).toFixed(2);

  return {
    monthlyPayout,
    totalReturns: +(monthlyPayout * tenure).toFixed(2),
  };
}
