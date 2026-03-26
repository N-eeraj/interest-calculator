import {
  SchemeType,
} from "#enums/schemes";

export const TENURE_MONTHS_INTERVALS = 3 as const;

export const MIN_TENURE_MONTHS: Record<SchemeType, number> = {
  [SchemeType.FD]: 12,
  [SchemeType.RD]: 6,
  [SchemeType.MIS]: 36,
} as const;

export const MAX_TENURE_MONTHS: Record<SchemeType, number> = {
  [SchemeType.FD]: 120,
  [SchemeType.RD]: 60,
  [SchemeType.MIS]: 120,
} as const;
