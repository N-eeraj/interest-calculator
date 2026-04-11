import { Link } from "@tanstack/react-router";

import { CompoundingType } from "@app/definitions/enums/schemes";
import {
  COMPOUNDING_TYPE_OPTIONS,
  INVESTMENT_TYPE_OPTIONS,
  SCHEMES,
} from "@app/definitions/constants/map";

import DsSpinner from "@components/ds/Spinner";
import DsButton from "@components/ds/Button";
import DsChip from "@components/ds/Chip";
import InvestmentForm from "@components/investment/Form";
import InvestmentChart from "@components/investment/Chart";
import InvestmentSummary from "@components/investment/Summary";
import useSaveInvestment, {
  type InitialData,
} from "@hooks/investments/useSaveInvestment";

interface Props {
  initialData?: InitialData;
}

export default function Investment({ initialData }: Props) {
  const {
    isFetchingData,
    formProps,
    summary,
    saveInvestment,
    savingInvestment,
  } = useSaveInvestment(initialData);

  if (isFetchingData) {
    return (
      <section className="grid place-content-center h-[calc(100svh-160px)]">
        <DsSpinner className="size-16" />
      </section>
    );
  }

  const {
    investmentType,
    compoundingType,
  } = SCHEMES[formProps.scheme];
  const investmentTypeText = INVESTMENT_TYPE_OPTIONS[investmentType];
  const compoundingTypeText = COMPOUNDING_TYPE_OPTIONS[compoundingType];

  return (
    <section className="grid md:grid-cols-2 gap-x-12 gap-y-6">
      <InvestmentForm {...formProps} />

      <div className="max-md:order-1 space-y-2">
        <InvestmentChart
          invested={summary.investedAmount}
          returns={summary.returns}
          className="w-full max-w-80" />
        <div className="flex justify-center items-center flex-wrap gap-1.5">
            {investmentTypeText && (
              <DsChip>
                Investment: {investmentTypeText}
              </DsChip>
            )}
            {(compoundingTypeText && compoundingType !== CompoundingType.NONE) && (
              <DsChip theme="secondary">
                Compounds: {compoundingTypeText}
              </DsChip>
            )}
          </div>
        <div className="flex items-center gap-x-6 mt-5">
          <Link
            to="/"
            className="grow">
            <DsButton
              variant="secondary-outline"
              disabled={savingInvestment}
              className="w-full">
              Cancel
            </DsButton>
          </Link>
          <DsButton
            loading={savingInvestment}
            className="grow"
            onClick={saveInvestment}>
            Save Investment
          </DsButton>
        </div>
      </div>

      <InvestmentSummary {...summary} />
    </section>
  );
}
