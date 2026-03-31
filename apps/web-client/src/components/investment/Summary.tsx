import DsAnimatedCounter from "@components/ds/AnimatedCounter";

interface Props {
  investedAmount: number;
  returns: number;
  totalValue: number;
  monthlyPayout: number;
}

export default function InvestmentSummary({
  investedAmount,
  returns,
  totalValue,
  monthlyPayout,
}: Props) {
  if (monthlyPayout === 0) {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span>
            Invested Amount
          </span>
          <strong className="font-semibold">
            <DsAnimatedCounter value={investedAmount} />
          </strong>
        </div>
        <div className="flex justify-between items-center">
          <span>
            Returns
          </span>
          <strong className="font-semibold">
            <DsAnimatedCounter value={returns} />
          </strong>
        </div>
        <div className="flex justify-between items-center">
          <span>
            Total Value
          </span>
          <strong className="font-semibold">
            <DsAnimatedCounter value={totalValue} />
          </strong>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-y-1">
      <span className="text-lg">
        Total Value
      </span>
      <strong className="font-semibold">
        <DsAnimatedCounter value={monthlyPayout} />
      </strong>
    </div>
  );
}
