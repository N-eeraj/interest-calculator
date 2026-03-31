import { useState } from "react";

import { SchemeType } from "@app/definitions/enums/schemes";
import resolveInterestRate from "@app/utils/resolveInterestRate";
import calculateFD from "@app/utils/calculateFD";
import calculateRD from "@app/utils/calculateRD";
import calculateMIS from "@app/utils/calculateMIS";
import { MIN_INVESTMENT_AMOUNT } from "@app/definitions/constants/scheme/amounts";
import { MIN_TENURE_MONTHS } from "@app/definitions/constants/scheme/tenures";
import { useAuthRefreshQuery } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@/utils/trpc";

export default function useCreateInvestment() {
  const trpc = useTRPC();

  const [scheme, setScheme] = useState(SchemeType.FD);
  const [investment, setInvestment] = useState(MIN_INVESTMENT_AMOUNT[scheme]);
  const [tenure, setTenure] = useState(MIN_TENURE_MONTHS[scheme]);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);

  const {
    data: schemeRates,
    isFetchingData: isFetchingSchemeRates,
  } = useAuthRefreshQuery(trpc.investment.scheme.rates.queryOptions());
  

  let interestRate = 0;
  if (
    schemeRates?.length &&
    tenure >= MIN_TENURE_MONTHS[scheme]
  ) {
    interestRate = resolveInterestRate(
      schemeRates.filter((schemeRate) => schemeRate.scheme === scheme),
      tenure,
      isSeniorCitizen,
    );
  }

  const summary = {
    investedAmount: investment,
    returns: 0,
    totalValue: 0,
    monthlyPayout: 0,
  };

  switch (scheme) {
    case SchemeType.FD:
      const calculatedFD = calculateFD(investment, tenure, interestRate);
      summary.returns = calculatedFD.interestEarned;
      summary.totalValue = calculatedFD.maturityAmount;
      break;
    case SchemeType.RD:
      const calculatedRD = calculateRD(investment, tenure, interestRate);
      summary.investedAmount = calculatedRD.totalDeposit;
      summary.returns = calculatedRD.interestEarned;
      summary.totalValue = calculatedRD.maturityAmount;
      break;
    case SchemeType.MIS:
      const calculatedMIS = calculateMIS(investment, tenure, interestRate);
      summary.monthlyPayout = calculatedMIS.monthlyPayout;
      summary.returns = calculatedMIS.totalReturns;
      break;
  }

  const formProps = {
    scheme,
    investment,
    tenure,
    isSeniorCitizen,
    setScheme,
    setInvestment,
    setTenure,
    setIsSeniorCitizen,
  };

  return {
    isFetchingSchemeRates,
    schemeRates,
    formProps,
    summary,
  };
}
