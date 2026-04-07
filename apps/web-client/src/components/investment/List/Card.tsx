import type { MouseEvent } from "react";
import { ArrowRightAltW700 } from "@material-symbols-svg/react/rounded/icons/arrow-right-alt";
import { DeleteW500 } from "@material-symbols-svg/react/rounded/icons/delete";
import { toast } from "sonner";

import { SchemeType } from "@app/definitions/enums/schemes";
import type { InvestmentSchema } from "@app/schemas/schemes";

import DsButton from "@components/ds/Button";
import DsCard from "@components/ds/Card";
import { formatCurrency } from "@utils/formatting";
import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";
import { queryClient } from "@/TRPCQueryProvider";

export default function InvestmentCard({
  id,
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
  const trpc = useTRPC();

  const years = Math.floor(tenureMonths / 12);
  const months = tenureMonths % 12;

  const mutation = useAuthRefreshMutation(trpc.investment.delete.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.investment.list.queryKey(),
      });
    },
    onError: (error) => {
      const [formError] = (error.shape?.formErrors ?? []) as Array<string>;
      toast.error(formError ?? error.message);
    },
  }));

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutation.mutate({ id });
  };

  const tenure =
    tenureMonths >= 12
      ? `${years} year${years > 1 ? "s" : ""}${
          months ? `, ${months} month${months > 1 ? "s" : ""}` : ""
        }`
      : `${tenureMonths} month${tenureMonths > 1 ? "s" : ""}`;

  return (
    <DsCard className="flex flex-col items-stretch gap-y-4 h-full py-5!">
      <div className="flex justify-between items-center">
        {
          isSeniorCitizen && (
            <span className="text-xs px-4 py-0.75 bg-primary/10 text-primary rounded-full border border-primary">
              Senior
            </span>
          )
        }
        <DsButton
          variant="destructive"
          size="icon-sm"
          loading={mutation.isSubmittingData}
          className="ml-auto px-0"
          onClick={handleDelete}>
          <DeleteW500 className="size-4" />
        </DsButton>
      </div>

      <div className="w-full h-2/3 flex items-center justify-center pt-2">
        {schemeType === SchemeType.FD && (
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Invested
              </span>
              <span className="text-xl font-semibold text-foreground/80">
                {formatCurrency(principalAmount ?? 0)}
              </span>
            </div>

            <ArrowRightAltW700 className="text-foreground/50" />

            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Maturity
              </span>
              <span className="text-2xl font-bold tracking-tight">
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
              <span className="text-xl font-semibold text-foreground/80">
                {formatCurrency(monthlyDeposit ?? 0)}
              </span>
            </div>

            <ArrowRightAltW700 className="text-foreground/50" />

            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Maturity
              </span>
              <span className="text-2xl font-bold">
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
              <span className="text-xl font-semibold text-foreground/80">
                {formatCurrency(principalAmount ?? 0)}
              </span>
            </div>

            <ArrowRightAltW700 className="text-foreground/50" />

            <div className="flex flex-col gap-y-0.5">
              <span className="text-xs text-foreground/60">
                Monthly Payout
              </span>
              <span className="text-xl font-bold">
                {formatCurrency(monthlyPayout ?? 0)}
              </span>
            </div>
          </div>
        )}
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
    </DsCard>
  );
}
