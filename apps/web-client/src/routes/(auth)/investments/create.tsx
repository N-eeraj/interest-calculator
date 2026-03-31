import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SchemeType } from "@app/definitions/enums/schemes";
import resolveInterestRate from "@app/utils/resolveInterestRate";
import calculateFD from "@app/utils/calculateFD";
import calculateRD from "@app/utils/calculateRD";
import calculateMIS from "@app/utils/calculateMIS";
import { MIN_INVESTMENT_AMOUNT } from "@app/definitions/constants/scheme/amounts";
import { MIN_TENURE_MONTHS } from "@app/definitions/constants/scheme/tenures";

import InvestmentForm from "@components/investment/Form";
import DsSpinner from "@components/ds/Spinner";
import { useAuthRefreshQuery } from "@/hooks/useAuthRefreshQuery";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/(auth)/investments/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();

  const [scheme, setScheme] = useState(SchemeType.FD);
  const [investment, setInvestment] = useState(MIN_INVESTMENT_AMOUNT[scheme]);
  const [tenure, setTenure] = useState(MIN_TENURE_MONTHS[scheme]);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);

  const {
    data: schemeRates,
    isFetchingData: isFetchingSchemeRates,
  } = useAuthRefreshQuery(trpc.investment.scheme.rates.queryOptions());
  if (isFetchingSchemeRates || !schemeRates) {
    return (
      <section className="grid place-content-center h-[calc(100svh-160px)]">
        <DsSpinner className="size-16" />
      </section>
    );
  }

  let interestRate = 0;
  try {
    interestRate = resolveInterestRate(
      schemeRates.filter((schemeRate) => schemeRate.scheme === scheme),
      tenure,
      isSeniorCitizen,
    );
  } catch {}

  let investedAmount = investment;
  let returns = 0;
  let totalValue = 0;
  let monthlyPayout = 0;

  switch (scheme) {
    case SchemeType.FD:
      const calculatedFD = calculateFD(investment, tenure, interestRate);
      returns = calculatedFD.interestEarned;
      totalValue = calculatedFD.maturityAmount;
      break;
    case SchemeType.RD:
      const calculatedRD = calculateRD(investment, tenure, interestRate);
      investedAmount = calculatedRD.totalDeposit;
      returns = calculatedRD.interestEarned;
      totalValue = calculatedRD.maturityAmount;
      break;
    case SchemeType.MIS:
      const calculatedMIS = calculateMIS(investment, tenure, interestRate);
      monthlyPayout = calculatedMIS.monthlyPayout;
      break;
  }

  return (
    <section className="grid md:grid-cols-2 gap-x-12 gap-y-4">
      <InvestmentForm
        scheme={scheme}
        investment={investment}
        tenure={tenure}
        isSeniorCitizen={isSeniorCitizen}
        setScheme={setScheme}
        setInvestment={setInvestment}
        setTenure={setTenure}
        setIsSeniorCitizen={setIsSeniorCitizen} />

      {monthlyPayout === 0 ?
        (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>
                Invested Amount
              </span>
              <strong>
                {investedAmount}
              </strong>
            </div>
            <div className="flex justify-between items-center">
              <span>
                Returns
              </span>
              <strong>
                {returns}
              </strong>
            </div>
            <div className="flex justify-between items-center">
              <span>
                Total Value
              </span>
              <strong>
                {totalValue}
              </strong>
            </div>
          </div>
        ) :
        (
          <div className="flex flex-col items-center gap-y-1">
            <span className="text-lg">
              Total Value
            </span>
            <strong className="text-xl">
              {monthlyPayout}
            </strong>
          </div>
        )
      }
    </section>
  );
}
