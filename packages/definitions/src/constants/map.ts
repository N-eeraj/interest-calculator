import {
  SchemeType,
  InvestmentType,
  CompoundingType,
} from "#enums/schemes";
import { SortByOption } from "#enums/sort";

interface SchemeDetails {
  shortName: string;
  name: string;
  investmentType: InvestmentType;
  compoundingType: CompoundingType;
  description: string;
}

export const SCHEMES: Record<SchemeType, SchemeDetails> = {
  [SchemeType.FD]: {
    shortName: "FD",
    name: "Fixed Deposit",
    investmentType: InvestmentType.LUMP_SUM,
    compoundingType: CompoundingType.QUARTERLY,
    description: "A lump-sum investment made for a fixed tenure at a predetermined interest rate. Offers capital safety and guaranteed returns, making it suitable for conservative investors seeking stable growth.",
  },
  [SchemeType.RD]: {
    shortName: "RD",
    name: "Recurring Deposit",
    investmentType: InvestmentType.RECURRING,
    compoundingType: CompoundingType.QUARTERLY,
    description: "An investment where a fixed amount is deposited monthly for a fixed tenure at a predetermined interest rate. Encourages disciplined savings and provides assured returns at maturity.",
  },
  [SchemeType.MIS]: {
    shortName: "MIS",
    name: "Monthly Income Scheme",
    investmentType: InvestmentType.LUMP_SUM,
    compoundingType: CompoundingType.NONE,
    description: "A one-time investment that provides regular monthly payouts. Ideal for investors seeking steady income or passive cash flow.",
  },
} as const;

export const COMPOUNDING_TYPE_OPTIONS: Record<CompoundingType, string> = {
  [CompoundingType.NONE]: "None",
  [CompoundingType.QUARTERLY]: "Quarterly",
  [CompoundingType.YEARLY]: "Yearly",
} as const;

export const INVESTMENT_TYPE_OPTIONS: Record<InvestmentType, string> = {
  [InvestmentType.LUMP_SUM]: "Lump Sum",
  [InvestmentType.RECURRING]: "Recurring",
} as const;

export const SORT_BY_OPTIONS: Record<SortByOption, string> = {
  [SortByOption.DATE]: "Created Date",
  [SortByOption.RATE]: "Interest Rate",
  [SortByOption.AMOUNT]: "Maturity Amount",
} as const;