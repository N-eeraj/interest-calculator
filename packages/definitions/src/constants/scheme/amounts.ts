import { SchemeType } from "#enums/schemes";

export const MIN_INVESTMENT_AMOUNT: Record<SchemeType, number> = {
  [SchemeType.FD]:       1_000, // principal amount
  [SchemeType.RD]:         100, // monthly deposit
  [SchemeType.MIS]:     10_000, // principal amount
};

export const MAX_INVESTMENT_AMOUNT: Record<SchemeType, number> = {
  [SchemeType.FD]: 1_00_00_000, // principal amount
  [SchemeType.RD]:    1_00_000, // monthly deposit
  [SchemeType.MIS]:  50_00_000, // principal amount
};
