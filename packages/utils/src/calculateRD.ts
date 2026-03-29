interface Returns {
  maturityAmount: number;
  totalDeposit: number;
  interestEarned: number;
}

/**
 * Calculates the returns for a RD with quarterly compounding.
 *
 * @param monthlyDeposit - The amount invested monthly
 * @param tenure - The tenure in months
 * @param interestRate - Annual interest rate in percentage
 *
 * @returns The maturity amount, total deposits and interest earned
 */
export default function calculateRD(
  monthlyDeposit: number,
  tenure: number,
  interestRate: number,
): Returns {
  if (monthlyDeposit < 0) {
    throw new Error("Invalid principal amount");
  }
  if (tenure < 0) {
    throw new Error("Invalid tenure");
  }
  if (interestRate < 0) {
    throw new Error("Invalid interest rate");
  }

  const totalDeposit = +(monthlyDeposit * tenure).toFixed(2);
  let maturityAmount;
  if (interestRate) {
    const quarterlyRate = interestRate / 400;

    maturityAmount = +(
      monthlyDeposit *
      (
        ((1 + quarterlyRate) ** (tenure / 3) - 1) /
        (1 - (1 + quarterlyRate) ** (-1 / 3))
      )
    ).toFixed(2);
  } else {
    maturityAmount = totalDeposit;
  }

  const interestEarned = +(maturityAmount - totalDeposit).toFixed(2);

  return {
    maturityAmount,
    totalDeposit,
    interestEarned,
  };
}
