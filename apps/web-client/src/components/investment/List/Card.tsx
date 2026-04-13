import { ArrowRightAltW700 } from "@material-symbols-svg/react/rounded/icons/arrow-right-alt";
import { DeleteW500 } from "@material-symbols-svg/react/rounded/icons/delete";

import { CompoundingType } from "@app/definitions/enums/schemes";
import { SCHEMES } from "@app/definitions/constants/map";
import type { Investment } from "@app/schemas/schemes";

import DsButton from "@components/ds/Button";
import DsCard from "@components/ds/Card";
import DsChip from "@components/ds/Chip";
import useInvestmentCard, {
  type Parameters,
} from "@hooks/investments/useInvestmentCard";
import { formatCurrency } from "@utils/formatting";

interface Props extends Investment {
  isDeleting?: boolean;
  onDelete?: Parameters["onDelete"];
}

export default function InvestmentCard({
  isDeleting,
  onDelete,
  ...investment
}: Props) {
  const {
    tenure,
    fromLabel,
    fromAmount,
    toLabel,
    toAmount,
    compoundingType,
    investmentTypeText,
    compoundingTypeText,
    handleDelete,
  } = useInvestmentCard(investment);

  const {
    schemeType,
    isSeniorCitizen,
    interestRate,
    updatedAt,
  } = investment;

  return (
    <DsCard className="flex flex-col items-stretch gap-y-4 h-full py-5!">
      <div className="flex justify-between items-center flex-wrap gap-2.5">
        <div className="flex items-center flex-wrap gap-1.5">
          <DsChip>
            {SCHEMES[schemeType].shortName}
          </DsChip>
          {
            isSeniorCitizen && (
              <DsChip theme="secondary">
                Senior Citizen
              </DsChip>
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
          <DsChip size="sm">
            Investment: {investmentTypeText}
          </DsChip>
        )}
        {(compoundingTypeText && compoundingType !== CompoundingType.NONE) && (
          <DsChip
            size="sm"
            theme="secondary">
            Compounds: {compoundingTypeText}
          </DsChip>
        )}
      </div>
    </DsCard>
  );
}
