import {
  describe,
  it,
  expect,
} from "vitest";
import calculateRD from "./calculateRD";

describe("calculateRD", () => {
  const TEST_CASES = [
    {
      caseName: "1 year small deposit",
      principalAmount: 500,
      tenure: 12,
      interestRate: 5,
      expected: {
        maturityAmount: 6164.32,
        totalDeposits: 6000,
        interestEarned: 164.32,
      },
    },
    {
      caseName: "6 months mid deposit",
      principalAmount: 2000,
      tenure: 6,
      interestRate: 6,
      expected: {
        maturityAmount: 12210.7,
        totalDeposits: 12000,
        interestEarned: 210.7,
      },
    },
    {
      caseName: "2 years medium deposit",
      principalAmount: 10000,
      tenure: 24,
      interestRate: 7,
      expected: {
        maturityAmount: 258197.81,
        totalDeposits: 240000,
        interestEarned: 18197.81,
      },
    },
    {
      caseName: "3 months short tenure",
      principalAmount: 1500,
      tenure: 3,
      interestRate: 4,
      expected: {
        maturityAmount: 4529.97,
        totalDeposits: 4500,
        interestEarned: 29.97,
      },
    },
    {
      caseName: "5 years low interest",
      principalAmount: 30000,
      tenure: 60,
      interestRate: 3,
      expected: {
        maturityAmount: 1943872.73,
        totalDeposits: 1800000,
        interestEarned: 143872.73,
      },
    },
    {
      caseName: "zero deposit, 1 year",
      principalAmount: 0,
      tenure: 12,
      interestRate: 5,
      expected: {
        maturityAmount: 0,
        totalDeposits: 0,
        interestEarned: 0,
      },
    },
    {
      caseName: "zero tenure, mid deposit",
      principalAmount: 1000,
      tenure: 0,
      interestRate: 5,
      expected: {
        maturityAmount: 0,
        totalDeposits: 0,
        interestEarned: 0,
      },
    },
    {
      caseName: "zero interest rate, mid deposit",
      principalAmount: 1000,
      tenure: 12,
      interestRate: 0,
      expected: {
        maturityAmount: 12000,
        totalDeposits: 12000,
        interestEarned: 0,
      },
    },
    {
      caseName: "small deposit, high interest",
      principalAmount: 100,
      tenure: 12,
      interestRate: 12,
      expected: {
        maturityAmount: 1280.11,
        totalDeposits: 1200,
        interestEarned: 80.11,
      },
    },
    {
      caseName: "long tenure, medium deposit",
      principalAmount: 50000,
      tenure: 84,
      interestRate: 5,
      expected: {
        maturityAmount: 5033449.46,
        totalDeposits: 4200000,
        interestEarned: 833449.46,
      },
    },
  ] as const;

  TEST_CASES.forEach(({ caseName, principalAmount, tenure, interestRate, expected }) => {
    it(caseName, () => {
      expect(calculateRD(principalAmount, tenure, interestRate))
        .toStrictEqual(expected);
    });
  });


  it("throws error for negative principal", () => {
    expect(() => calculateRD(-1000, 12, 5)).toThrow("Invalid principal amount");
  });

  it("throws error for negative tenure", () => {
    expect(() => calculateRD(1000, -12, 5)).toThrow("Invalid tenure");
  });

  it("throws error for negative interest rate", () => {
    expect(() => calculateRD(1000, 12, -5)).toThrow("Invalid interest rate");
  });
});
