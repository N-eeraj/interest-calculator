import {
  describe,
  expect,
  it,
} from "vitest";
import calculateFD from "./calculateFD";

describe("calculateFD", () => {
  const TEST_CASES = [
    {
      caseName: "1 year small principal",
      principalAmount: 500,
      tenure: 12,
      interestRate: 5,
      expected: {
        maturityAmount: 525.47,
        interestEarned: 25.47,
      },
    },
    {
      caseName: "6 months mid principal",
      principalAmount: 2000,
      tenure: 6,
      interestRate: 6,
      expected: {
        maturityAmount: 2060.45,
        interestEarned: 60.45,
      },
    },
    {
      caseName: "2 years medium principal",
      principalAmount: 10000,
      tenure: 24,
      interestRate: 7,
      expected: {
        maturityAmount: 11488.82,
        interestEarned: 1488.82,
      },
    },
    {
      caseName: "3 months short tenure",
      principalAmount: 1500,
      tenure: 3,
      interestRate: 4,
      expected: {
        maturityAmount: 1515.00,
        interestEarned: 15.00,
      },
    },
    {
      caseName: "5 years low interest",
      principalAmount: 30000,
      tenure: 60,
      interestRate: 3,
      expected: {
        maturityAmount: 34835.52,
        interestEarned: 4835.52,
      },
    },
    {
      caseName: "1.5 years mid interest",
      principalAmount: 12000,
      tenure: 18,
      interestRate: 6,
      expected: {
        maturityAmount: 13121.32,
        interestEarned: 1121.32,
      },
    },
    {
      caseName: "7 years long tenure",
      principalAmount: 50000,
      tenure: 84,
      interestRate: 5,
      expected: {
        maturityAmount: 70799.62,
        interestEarned: 20799.62,
      },
    },
    {
      caseName: "10 years very long tenure",
      principalAmount: 100000,
      tenure: 120,
      interestRate: 6,
      expected: {
        maturityAmount: 181401.84,
        interestEarned: 81401.84,
      },
    },
    {
      caseName: "small principal, high interest",
      principalAmount: 100,
      tenure: 12,
      interestRate: 12,
      expected: {
        maturityAmount: 112.55,
        interestEarned: 12.55,
      },
    },
    {
      caseName: "mid principal, mid interest",
      principalAmount: 25000,
      tenure: 36,
      interestRate: 8,
      expected: {
        maturityAmount: 31706.04,
        interestEarned: 6706.04,
      },
    },
    {
      caseName: "large principal, high interest",
      principalAmount: 1000000,
      tenure: 48,
      interestRate: 7,
      expected: {
        maturityAmount: 1319929.35,
        interestEarned: 319929.35,
      },
    },
    {
      caseName: "short tenure, low interest",
      principalAmount: 5000,
      tenure: 2,
      interestRate: 3,
      expected: {
        maturityAmount: 5024.97,
        interestEarned: 24.97,
      },
    },
    {
      caseName: "medium principal, short tenure",
      principalAmount: 15000,
      tenure: 9,
      interestRate: 6,
      expected: {
        maturityAmount: 15685.18,
        interestEarned: 685.18,
      },
    },
    {
      caseName: "medium principal, 2.5 years",
      principalAmount: 20000,
      tenure: 30,
      interestRate: 5,
      expected: {
        maturityAmount: 22645.42,
        interestEarned: 2645.42,
      },
    },
    {
      caseName: "large principal, 3.5 years",
      principalAmount: 75000,
      tenure: 42,
      interestRate: 6.5,
      expected: {
        maturityAmount: 93987.28,
        interestEarned: 18987.28,
      },
    },
    {
      caseName: "zero principal, 1 year",
      principalAmount: 0,
      tenure: 12,
      interestRate: 5,
      expected: {
        maturityAmount: 0,
        interestEarned: 0,
      },
    },
    {
      caseName: "zero tenure, mid principal",
      principalAmount: 1000,
      tenure: 0,
      interestRate: 5,
      expected: {
        maturityAmount: 1000,
        interestEarned: 0,
      },
    },
    {
      caseName: "zero interest rate, mid principal",
      principalAmount: 1000,
      tenure: 12,
      interestRate: 0,
      expected: {
        maturityAmount: 1000,
        interestEarned: 0,
      },
    },
    {
      caseName: "zero principal and zero tenure",
      principalAmount: 0,
      tenure: 0,
      interestRate: 5,
      expected: {
        maturityAmount: 0,
        interestEarned: 0,
      },
    },
    {
      caseName: "zero principal and zero interest",
      principalAmount: 0,
      tenure: 12,
      interestRate: 0,
      expected: {
        maturityAmount: 0,
        interestEarned: 0,
      },
    },
    {
      caseName: "zero tenure and zero interest",
      principalAmount: 1000,
      tenure: 0,
      interestRate: 0,
      expected: {
        maturityAmount: 1000,
        interestEarned: 0,
      },
    },
  ] as const;

  TEST_CASES.forEach(({ caseName, principalAmount, tenure, interestRate, expected }) => {
    it(caseName, () => {
      expect(calculateFD(principalAmount, tenure, interestRate))
        .toStrictEqual(expected);
    });
  });

  it("throws error for negative principal", () => {
    expect(() => calculateFD(-1000, 12, 5)).toThrow("Invalid principal amount");
  });

  it("throws error for negative tenure", () => {
    expect(() => calculateFD(1000, -12, 5)).toThrow("Invalid tenure");
  });

  it("throws error for negative interest rate", () => {
    expect(() => calculateFD(1000, 12, -5)).toThrow("Invalid interest rate");
  });
})
