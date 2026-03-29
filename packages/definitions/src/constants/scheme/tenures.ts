import { SchemeType } from "#enums/schemes";

export const TENURE_MONTHS_INTERVALS = 3 as const;

export const MIN_TENURE_MONTHS: Record<SchemeType, number> = {
  [SchemeType.FD]:  12, // 1 yr
  [SchemeType.RD]:   6, // 6 mos
  [SchemeType.MIS]: 36, // 3 yrs
} as const;

export const MAX_TENURE_MONTHS: Record<SchemeType, number> = {
  [SchemeType.FD]:  120, // 10 yrs
  [SchemeType.RD]:  120, // 10 yrs
  [SchemeType.MIS]: 120, // 10 yrs
} as const;
