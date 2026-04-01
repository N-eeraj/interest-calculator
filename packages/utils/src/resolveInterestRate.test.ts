import {
  describe,
  expect,
  it,
} from "vitest";
import {
  resolveInterestRate,
  type SchemeRates,
} from "./resolveInterestRate";

describe("resolveInterestRate", () => {
  const RATES: Array<SchemeRates> = [
    {
      tenureMonths: 36,
      regularRate: 6.75,
      seniorRate: 7.25,
    },
    {
      tenureMonths: 12,
      regularRate: 6.2,
      seniorRate: 6.6,
    },
    {
      tenureMonths: 84,
      regularRate: 7.3,
      seniorRate: 7.75,
    },
    {
      tenureMonths: 5,
      regularRate: 5.5,
      seniorRate: 6.0,
    },
    {
      tenureMonths: 120,
      regularRate: 7.5,
      seniorRate: 8.0,
    },
    {
      tenureMonths: 60,
      regularRate: 7.1,
      seniorRate: 7.5,
    },
    {
      tenureMonths: 24,
      regularRate: 6.4,
      seniorRate: 6.9,
    },
    {
      tenureMonths: 3,
      regularRate: 5.0,
      seniorRate: 5.5,
    },
    {
      tenureMonths: 48,
      regularRate: 7.0,
      seniorRate: 7.4,
    },
    {
      tenureMonths: 200,
      regularRate: 8.0,
      seniorRate: 8.5,
    },
  ] as const;

  const TEST_CASES = [
    {
      caseName: "Tenure 2, regular (below min, should throw)",
      tenure: 2,
      isSenior: false,
      expected: null,
    },
    {
      caseName: "Tenure 2, senior (below min, should throw)",
      tenure: 2,
      isSenior: true,
      expected: null,
    },
    {
      caseName: "Tenure 3, regular",
      tenure: 3,
      isSenior: false,
      expected: 5.0,
    },
    {
      caseName: "Tenure 3, senior",
      tenure: 3,
      isSenior: true,
      expected: 5.5,
    },
    {
      caseName: "Tenure 4, regular",
      tenure: 4,
      isSenior: false,
      expected: 5.0,
    },
    {
      caseName: "Tenure 4, senior",
      tenure: 4,
      isSenior: true,
      expected: 5.5,
    },
    {
      caseName: "Tenure 5, regular",
      tenure: 5,
      isSenior: false,
      expected: 5.5,
    },
    {
      caseName: "Tenure 5, senior",
      tenure: 5,
      isSenior: true,
      expected: 6.0,
    },
    {
      caseName: "Tenure 7, regular",
      tenure: 7,
      isSenior: false,
      expected: 5.5,
    },
    {
      caseName: "Tenure 7, senior",
      tenure: 7,
      isSenior: true,
      expected: 6.0,
    },
    {
      caseName: "Tenure 9, regular",
      tenure: 9,
      isSenior: false,
      expected: 5.5,
    },
    {
      caseName: "Tenure 9, senior",
      tenure: 9,
      isSenior: true,
      expected: 6,
    },
    {
      caseName: "Tenure 10, regular",
      tenure: 10,
      isSenior: false,
      expected: 5.5,
    },
    {
      caseName: "Tenure 10, senior",
      tenure: 10,
      isSenior: true,
      expected: 6,
    },
    {
      caseName: "Tenure 14, regular",
      tenure: 14,
      isSenior: false,
      expected: 6.2,
    },
    {
      caseName: "Tenure 14, senior",
      tenure: 14,
      isSenior: true,
      expected: 6.6,
    },
    {
      caseName: "Tenure 22, regular",
      tenure: 22,
      isSenior: false,
      expected: 6.2,
    },
    {
      caseName: "Tenure 22, senior",
      tenure: 22,
      isSenior: true,
      expected: 6.6,
    },
    {
      caseName: "Tenure 36, regular",
      tenure: 36,
      isSenior: false,
      expected: 6.75,
    },
    {
      caseName: "Tenure 36, senior",
      tenure: 36,
      isSenior: true,
      expected: 7.25,
    },
    {
      caseName: "Tenure 50, regular",
      tenure: 50,
      isSenior: false,
      expected: 7.0,
    },
    {
      caseName: "Tenure 50, senior",
      tenure: 50,
      isSenior: true,
      expected: 7.4,
    },
    {
      caseName: "Tenure 10000, regular (above max)",
      tenure: 10000,
      isSenior: false,
      expected: 8.0,
    },
    {
      caseName: "Tenure 10000, senior (above max)",
      tenure: 10000,
      isSenior: true,
      expected: 8.5,
    },
  ] as const;

  it("Empty Input", () => {
    expect(() => resolveInterestRate([], 0, false))
      .toThrow("Unable to find rates");
  });

  for (const { caseName, tenure, isSenior, expected } of TEST_CASES) {
    if (expected === null) {
      it(caseName, () => {
        expect(() => resolveInterestRate(RATES, tenure, isSenior))
          .toThrow("Unable to find rates");
      });
    } else {
      it(caseName, () => {
        expect(resolveInterestRate(RATES, tenure, isSenior))
          .toBe(expected);
      });
    }
  }
})
