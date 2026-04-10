import { Link } from "@tanstack/react-router";

import DsSpinner from "@components/ds/Spinner";
import DsButton from "@components/ds/Button";
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

  return (
    <section className="grid md:grid-cols-2 gap-x-12 gap-y-6">
      <InvestmentForm {...formProps} />

      <div className="max-md:order-1">
        <InvestmentChart
          invested={summary.investedAmount}
          returns={summary.returns}
          className="w-full max-w-80" />
        <div className="flex items-center gap-x-6">
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
