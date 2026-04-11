import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import z, {
  ZodError,
} from "zod";
import { toast } from "sonner";

import { SchemeType } from "@app/definitions/enums/schemes";
import { resolveInterestRate } from "@app/utils/resolveInterestRate";
import calculateFD from "@app/utils/calculateFD";
import calculateRD from "@app/utils/calculateRD";
import calculateMIS from "@app/utils/calculateMIS";
import { MIN_INVESTMENT_AMOUNT } from "@app/definitions/constants/scheme/amounts";
import { MIN_TENURE_MONTHS } from "@app/definitions/constants/scheme/tenures";
import {
  createInvestmentSchema,
  updateInvestmentSchema,
  type InvestmentSchema,
} from "@app/schemas/schemes";

import {
  useAuthRefreshMutation,
  useAuthRefreshQuery,
} from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";
import { queryClient } from "@/TRPCQueryProvider";

export type InitialData = Pick<InvestmentSchema, "id" | "schemeType" | "principalAmount" | "monthlyDeposit" | "tenureMonths" | "isSeniorCitizen">;

export default function useSaveInvestment(initialData?: InitialData) {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const [scheme, setScheme] = useState(SchemeType.FD);
  const [investment, setInvestment] = useState(MIN_INVESTMENT_AMOUNT[scheme]);
  const [tenure, setTenure] = useState(MIN_TENURE_MONTHS[scheme] / 12);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
  const [tenureType, setTenureType] = useState<"month" | "year">("year");

  const isUpdate = !!initialData;

  useEffect(() => {
    if (!initialData) return;
    setScheme(initialData.schemeType);
    setInvestment((initialData.principalAmount ?? initialData.monthlyDeposit) as number);
    setTenure(initialData.tenureMonths / 12);
    setIsSeniorCitizen(initialData.isSeniorCitizen ?? false);
  }, [
    initialData,
  ]);

  const {
    data: schemeRates,
    isFetchingData: isFetchingSchemeRates,
  } = useAuthRefreshQuery(trpc.investment.scheme.rates.queryOptions());
  const {
    data: schemes,
    isFetchingData: isFetchingSchemes,
  } = useAuthRefreshQuery(trpc.investment.scheme.list.queryOptions());

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

  const saveInvestmentMutation = useAuthRefreshMutation(trpc.investment[isUpdate ? "update" : "create"].mutationOptions({
    onSuccess: () => {
      toast.success(isUpdate ? "Updated Investment" : "Saved Investment");
      navigate({
        to: "/",
      });
      queryClient.invalidateQueries({
        queryKey: trpc.investment.list.queryKey(),
      });
      if (isUpdate) {
        queryClient.invalidateQueries({
          queryKey: trpc.investment.getById.queryKey({ id: initialData.id }),
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }));

  const saveInvestment = () => {
    const selectedScheme = schemes?.find(({ type }) => type === scheme);
    if (!selectedScheme) return;
    const payload = {
      id: initialData?.id as number, // only for update
      schemeId: selectedScheme.id,
      tenureMonths,
      isSeniorCitizen,
      investment,
    };
    const schema = isUpdate ? updateInvestmentSchema : createInvestmentSchema;
    try {
      schema.parse(payload);
      saveInvestmentMutation.mutate(payload);
    } catch (error) {
      let errorMessage = "Oops! Failed to save investment";
      if (error instanceof ZodError) {
        const { fieldErrors } = z.flattenError(error);
        if (Object.values(fieldErrors).flat().length) {
          errorMessage = Object.values(fieldErrors).flat()[0] as string;
        }
      }
      toast.error(errorMessage);
    }
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
