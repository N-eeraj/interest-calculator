interface Returns {
  maturityAmount: number;
  interestEarned: number;
}

/**
 * Calculates the returns for a FD with quarterly compounding.
 *
 * @param principalAmount - The principal amount invested
 * @param tenure - The tenure in months
 * @param interestRate - Annual interest rate in percentage
 *
 * @returns The maturity amount and interest earned
 */
export default function calculateFD(
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

  const tenureInYears = tenure / 12;
  const rate = interestRate / 100;
  const maturityAmount = +(principalAmount * (1 + (rate / 4)) ** (4 * tenureInYears)).toFixed(2);

  const interestEarned = +(maturityAmount - principalAmount).toFixed(2);

  return {
    maturityAmount,
    interestEarned,
  };
}
