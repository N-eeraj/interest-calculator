import DsAnimatedCounter from "@components/ds/AnimatedCounter";

interface Props {
  investedAmount: number;
  interestRate: number;
  returns: number;
  totalValue: number;
  monthlyPayout: number;
}

export default function InvestmentSummary({
  investedAmount,
  interestRate,
  returns,
  totalValue,
  monthlyPayout,
}: Props) {
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
          Rate of Interest (p.a)
        </span>
        <strong className="font-semibold">
          <DsAnimatedCounter value={interestRate} />
        </strong>
      </div>
      {monthlyPayout === 0 ? (
        <div className="flex justify-between items-center">
          <span>
            Returns
          </span>
          <strong className="font-semibold">
            <DsAnimatedCounter value={returns} />
          </strong>
        </div>
        ) : (
        <div className="flex justify-between items-center">
          <span>
            Monthly Payout
          </span>
          <strong className="font-semibold">
            <DsAnimatedCounter value={monthlyPayout} />
          </strong>
        </div>
        )
      }
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
