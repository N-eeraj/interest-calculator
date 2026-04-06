import { ArrowRightAltW700 } from "@material-symbols-svg/react/rounded/icons/arrow-right-alt";

import { SchemeType } from "@app/definitions/enums/schemes";
import type { InvestmentSchema } from "@app/schemas/schemes";

import DsCard from "@components/ds/Card";
import { formatCurrency } from "@utils/formatting";

export default function InvestmentCard({
  principalAmount,
  schemeType,
  monthlyDeposit,
  monthlyPayout,
  maturityAmount,
  tenureMonths,
  isSeniorCitizen,
  interestRate,
  updatedAt,
}: InvestmentSchema) {
  return (
    <DsCard className="flex flex-col items-stretch gap-y-4 h-full">
      <div className="flex justify-between items-center">
        {
          isSeniorCitizen && (
            <span className="text-xs px-4 py-0.75 bg-primary/10 text-primary rounded-full border border-primary">
              Senior
            </span>
          )
        }
        <div className="ml-auto">
          
        </div>
      </div>

      <div className="w-full h-2/3 flex items-center justify-center pt-2">
        {schemeType === SchemeType.FD && (
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Invested
              </span>
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                {formatCurrency(principalAmount ?? 0)}
              </span>
            </div>

            <ArrowRightAltW700 className="text-foreground/50" />

            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Maturity
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {formatCurrency(maturityAmount ?? 0)}
              </span>
            </div>
          </div>
        )}

        {schemeType === SchemeType.RD && (
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Monthly
              </span>
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                {formatCurrency(monthlyDeposit ?? 0)}
              </span>
            </div>

            <ArrowRightAltW700 className="text-foreground/50" />

            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Maturity
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(maturityAmount ?? 0)}
              </span>
            </div>
          </div>
        )}

        {schemeType === SchemeType.MIS && (
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Invested
              </span>
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                {formatCurrency(principalAmount ?? 0)}
              </span>
            </div>

            <ArrowRightAltW700 className="text-foreground/50" />

            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Monthly Payout
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(monthlyPayout ?? 0)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-[3fr_4fr] grid-rows-[2fr_1fr] items-start">
        <div className="flex flex-col justify-center row-span-2">
          <span className="text-[28px] font-bold text-gray-900 dark:text-white">
            {interestRate}%
          </span>
          <span className="text-xs text-gray-400">
            Interest Rate (p.a)
          </span>
        </div>

        <div className="flex flex-col justify-center items-end text-right">
          <span className="text-base font-semibold text-gray-800 dark:text-white">
            {tenureMonths >= 12
              ? (
                <>
                  {Math.floor(tenureMonths / 12)} years
                  {tenureMonths % 12 !== 0 && (
                    <>
                      ,&nbsp;{tenureMonths % 12} months
                    </>
                  )}
                </>
              )
              : (
                <>
                  {tenureMonths} months
                </>
              )}
          </span>
          <span className="text-xs text-gray-400">
            Tenure
          </span>
        </div>

        <div className="col-start-2 flex items-end justify-end text-[10px] text-gray-400">
          Updated at {updatedAt.toDateString()}
        </div>
      </div>
    </DsCard>
  );
}
