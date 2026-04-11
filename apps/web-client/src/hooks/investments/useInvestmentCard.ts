import type { MouseEvent } from "react";

import { SchemeType } from "@app/definitions/enums/schemes";
import type { InvestmentSchema } from "@app/schemas/schemes";
import {
  COMPOUNDING_TYPE_OPTIONS,
  INVESTMENT_TYPE_OPTIONS,
} from "@app/definitions/constants/map";

export interface Parameters extends InvestmentSchema {
  onDelete?: (id: InvestmentSchema["id"]) => void;
}

export default function useInvestmentCard({
  id,
  schemeType,
  investmentType,
  compoundingType,
  principalAmount,
  monthlyDeposit,
  maturityAmount,
  monthlyPayout,
  tenureMonths,
  onDelete,
}: Parameters) {
  const years = Math.floor(tenureMonths / 12);
  const months = tenureMonths % 12;

  const tenure =
    tenureMonths >= 12
      ? `${years} year${years > 1 ? "s" : ""}${
          months ? `, ${months} month${months > 1 ? "s" : ""}` : ""
        }`
      : `${tenureMonths} month${tenureMonths > 1 ? "s" : ""}`;

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onDelete?.(id);
  };

  let fromLabel, fromAmount, toLabel, toAmount;

  switch(schemeType) {
    case SchemeType.FD:
      fromLabel = "Invested";
      fromAmount = principalAmount;
      toLabel = "Maturity";
      toAmount = maturityAmount;
      break;
    case SchemeType.RD:
      fromLabel = "Monthly";
      fromAmount = monthlyDeposit;
      toLabel = "Maturity";
      toAmount = maturityAmount;
      break;
    case SchemeType.MIS:
      fromLabel = "Invested";
      fromAmount = principalAmount;
      toLabel = "Monthly Payout";
      toAmount = monthlyPayout;
      break;
  }

  const investmentTypeText = INVESTMENT_TYPE_OPTIONS[investmentType];
  const compoundingTypeText = COMPOUNDING_TYPE_OPTIONS[compoundingType];

  return {
    tenure,
    fromLabel,
    fromAmount,
    toLabel,
    toAmount,
    investmentTypeText,
    compoundingTypeText,
    investmentType,
    compoundingType,
    handleDelete,
  };
}
