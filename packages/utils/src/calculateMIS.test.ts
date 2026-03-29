import {
  describe,
  it,
  expect
} from "vitest";
import calculateMIS from "./calculateMIS";

describe("calculateMIS", () => {
  const TEST_CASES = [
    {
      caseName: "small principal, 6 months, 6% rate",
      principalAmount: 2000,
      tenure: 6,
      interestRate: 6,
      expected: {
        monthlyPayout: 10,
        totalReturns: 60,
      },
    },
    {
      caseName: "medium principal, 12 months, 5% rate",
      principalAmount: 5000,
      tenure: 12,
      interestRate: 5,
      expected: {
        monthlyPayout: 20.83,
        totalReturns: 249.96,
      },
    },
    {
      caseName: "large principal, 24 months, 7% rate",
      principalAmount: 10000,
      tenure: 24,
      interestRate: 7,
      expected: {
        monthlyPayout: 58.33,
        totalReturns: 1399.92,
      },
    },
    {
      caseName: "very small principal, 3 months, 4% rate",
      principalAmount: 1500,
      tenure: 3,
      interestRate: 4,
      expected: {
        monthlyPayout: 5,
        totalReturns: 15,
      },
    },
    {
      caseName: "medium principal, 5 years, 3% rate",
      principalAmount: 30000,
      tenure: 60,
      interestRate: 3,
      expected: {
        monthlyPayout: 75,
        totalReturns: 4500,
      },
    },
    {
      caseName: "zero principal, 12 months, 5% rate",
      principalAmount: 0,
      tenure: 12,
      interestRate: 5,
      expected: {
        monthlyPayout: 0,
        totalReturns: 0,
      },
    },
    {
      caseName: "principal 1000, zero tenure, 5% rate",
      principalAmount: 1000,
      tenure: 0,
      interestRate: 5,
      expected: {
        monthlyPayout: 4.17,
        totalReturns: 0,
      },
    },
    {
      caseName: "principal 1000, tenure 12 months, zero interest",
      principalAmount: 1000,
      tenure: 12,
      interestRate: 0,
      expected: {
        monthlyPayout: 0,
        totalReturns: 0,
      },
    },
    {
      caseName: "zero principal, zero tenure, zero interest",
      principalAmount: 0,
      tenure: 0,
      interestRate: 0,
      expected: {
        monthlyPayout: 0,
        totalReturns: 0,
      },
    },
    {
      caseName: "large principal, 10 years, 6.5% rate",
      principalAmount: 500000,
      tenure: 120,
      interestRate: 6.5,
      expected: {
        monthlyPayout: 2708.33,
        totalReturns: 324999.6,
      },
    },
    {
      caseName: "small principal, 1 month, 4% rate",
      principalAmount: 100,
      tenure: 1,
      interestRate: 4,
      expected: {
        monthlyPayout: 0.33,
        totalReturns: 0.33,
      },
    },
    {
      caseName: "medium principal, 18 months, 5.5% rate",
      principalAmount: 25000,
      tenure: 18,
      interestRate: 5.5,
      expected: {
        monthlyPayout: 114.58,
        totalReturns: 2062.44,
      },
    },
  ] as const;

  TEST_CASES.forEach(({ caseName, principalAmount, tenure, interestRate, expected }) => {
    it(caseName, () => {
      expect(calculateMIS(principalAmount, tenure, interestRate))
        .toStrictEqual(expected);
    });
  });

  it("throws error for negative principal", () => {
    expect(() => calculateMIS(-1000, 12, 5)).toThrow("Invalid principal amount");
  });

  it("throws error for negative tenure", () => {
    expect(() => calculateMIS(1000, -12, 5)).toThrow("Invalid tenure");
  });

  it("throws error for negative interest rate", () => {
    expect(() => calculateMIS(1000, 12, -5)).toThrow("Invalid interest rate");
  });
});
