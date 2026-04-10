import type { MouseEvent } from "react";
import { ArrowRightAltW700 } from "@material-symbols-svg/react/rounded/icons/arrow-right-alt";
import { DeleteW500 } from "@material-symbols-svg/react/rounded/icons/delete";

import {
  CompoundingType,
  SchemeType,
} from "@app/definitions/enums/schemes";
import {
  COMPOUNDING_TYPE_OPTIONS,
  INVESTMENT_TYPE_OPTIONS,
  SCHEMES,
} from "@app/definitions/constants/map";
import type { InvestmentSchema } from "@app/schemas/schemes";

import DsButton from "@components/ds/Button";
import DsCard from "@components/ds/Card";
import { formatCurrency } from "@utils/formatting";

interface Props extends InvestmentSchema {
  isDeleting?: boolean;
  onDelete?: (id: InvestmentSchema["id"]) => void;
}

export default function InvestmentCard({
  id,
  principalAmount,
  schemeType,
  investmentType,
  compoundingType,
  monthlyDeposit,
  monthlyPayout,
  maturityAmount,
  tenureMonths,
  isSeniorCitizen,
  interestRate,
  updatedAt,
  isDeleting,
  onDelete,
}: Props) {

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

  return (
    <DsCard className="flex flex-col items-stretch gap-y-4 h-full py-5!">
      <div className="flex justify-between items-center flex-wrap gap-2.5">
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-xs px-4 py-0.75 bg-primary/10 text-primary rounded-full border border-primary">
            {SCHEMES[schemeType].shortName}
          </span>
          {
            isSeniorCitizen && (
              <span className="text-xs px-4 py-0.75 bg-secondary/10 text-secondary rounded-full border border-secondary">
                Senior Citizen
              </span>
            )
          }
        </div>

        {onDelete && (
          <DsButton
            variant="destructive"
            size="icon-sm"
            loading={isDeleting}
            className="ml-auto px-0"
            onClick={handleDelete}>
            <DeleteW500 className="size-4" />
          </DsButton>
        )}
      </div>

      <div className="w-full h-2/3 flex items-center justify-center pt-2">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-y-0.5">
            <span className="text-xs text-foreground/60">
              {fromLabel}
            </span>
            <span className="text-xl font-semibold text-foreground/80">
              {formatCurrency(fromAmount ?? 0)}
            </span>
          </div>

          <ArrowRightAltW700 className="text-foreground/50" />

          <div className="flex flex-col gap-y-0.5">
            <span className="text-xs text-foreground/60">
              {toLabel}
            </span>
            <span className="text-2xl font-bold">
              {formatCurrency(toAmount ?? 0)}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-[3fr_4fr] grid-rows-[2fr_1fr] items-start">
        <div className="flex flex-col justify-center row-span-2">
          <span className="text-[28px] font-bold">
            {interestRate}%
          </span>
          <span className="text-xs text-foreground/50">
            Interest Rate (p.a)
          </span>
        </div>

        <div className="flex flex-col justify-center items-end text-right">
          <span className="text-base font-semibold text-foreground/80">
            {tenure}
          </span>
          <span className="text-xs text-foreground/50">
            Tenure
          </span>
        </div>

        <div className="col-start-2 flex items-end justify-end text-[10px] text-foreground/40">
          Updated at {updatedAt.toDateString()}
        </div>
      </div>

      <div className="flex justify-end items-center flex-wrap gap-1.5">
        {investmentTypeText && (
          <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary">
            Investment: {investmentTypeText}
          </span>
        )}
        {(compoundingTypeText && compoundingType !== CompoundingType.NONE) && (
          <span className="text-[10px] px-2 py-0.5 bg-secondary/10 text-secondary rounded-full border border-secondary">
            Compounds: {compoundingTypeText}
          </span>
        )}
      </div>
    </DsCard>
  );
}
