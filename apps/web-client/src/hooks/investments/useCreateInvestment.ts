import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { SchemeType } from "@app/definitions/enums/schemes";
import resolveInterestRate from "@app/utils/resolveInterestRate";
import calculateFD from "@app/utils/calculateFD";
import calculateRD from "@app/utils/calculateRD";
import calculateMIS from "@app/utils/calculateMIS";
import { MIN_INVESTMENT_AMOUNT } from "@app/definitions/constants/scheme/amounts";
import { MIN_TENURE_MONTHS } from "@app/definitions/constants/scheme/tenures";

import {
  useAuthRefreshMutation,
  useAuthRefreshQuery,
} from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

export default function useCreateInvestment() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const [scheme, setScheme] = useState(SchemeType.FD);
  const [investment, setInvestment] = useState(MIN_INVESTMENT_AMOUNT[scheme]);
  const [tenure, setTenure] = useState(MIN_TENURE_MONTHS[scheme] / 12);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
  const [tenureType, setTenureType] = useState<"month" | "year">("year");

  const {
    data: schemeRates,
    isFetchingData: isFetchingSchemeRates,
  } = useAuthRefreshQuery(trpc.investment.scheme.rates.queryOptions());
  const {
    data: schemes,
    isFetchingData: isFetchingSchemes,
  } = useAuthRefreshQuery(trpc.investment.scheme.get.queryOptions());

  const tenureMonths = tenure * (tenureType === "year" ? 12 : 1);
  let interestRate = 0;
  if (
    schemeRates?.length &&
    tenureMonths >= MIN_TENURE_MONTHS[scheme]
  ) {
    const selectedSchemeRates = schemeRates.filter((schemeRate) => schemeRate.scheme === scheme);
    interestRate = resolveInterestRate(
      selectedSchemeRates,
      tenureMonths,
      isSeniorCitizen,
    );
  }

  const summary = {
    investedAmount: investment,
    returns: 0,
    totalValue: 0,
    monthlyPayout: 0,
    interestRate,
  };

  switch (scheme) {
    case SchemeType.FD:
      const calculatedFD = calculateFD(investment, tenureMonths, interestRate);
      summary.returns = calculatedFD.interestEarned;
      summary.totalValue = calculatedFD.maturityAmount;
      break;
    case SchemeType.RD:
      const calculatedRD = calculateRD(investment, tenureMonths, interestRate);
      summary.investedAmount = calculatedRD.totalDeposit;
      summary.returns = calculatedRD.interestEarned;
      summary.totalValue = calculatedRD.maturityAmount;
      break;
    case SchemeType.MIS:
      const calculatedMIS = calculateMIS(investment, tenureMonths, interestRate);
      summary.monthlyPayout = calculatedMIS.monthlyPayout;
      summary.returns = calculatedMIS.totalReturns;
      break;
  }

  const formProps = {
    scheme,
    investment,
    tenure,
    isSeniorCitizen,
    tenureType,
    setScheme,
    setInvestment,
    setTenure,
    setIsSeniorCitizen,
    setTenureType,
  };

  const saveInvestmentMutation = useAuthRefreshMutation(trpc.investment.create.mutationOptions({
    onSuccess: () => {
      toast.success("Saved Investment");
      navigate({
        to: "/",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }));

  const saveInvestment = () => {
    const selectedScheme = schemes?.find(({ type }) => type === scheme);
    if (!selectedScheme) return;
    saveInvestmentMutation.mutate({
      schemeId: selectedScheme.id,
      tenureMonths,
      isSeniorCitizen,
      investment,
    });
  };

  return {
    isFetchingData: isFetchingSchemeRates || isFetchingSchemes,
    schemeRates,
    formProps,
    summary,
    saveInvestment,
    savingInvestment: saveInvestmentMutation.isSubmittingData,
  };
}
