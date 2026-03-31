import { createFileRoute } from "@tanstack/react-router";

import InvestmentForm from "@components/investment/Form";
import InvestmentSummary from "@components/investment/Summary";
import DsSpinner from "@components/ds/Spinner";
import useCreateInvestment from "@hooks/investments/useCreateInvestment";

export const Route = createFileRoute("/(auth)/investments/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    isFetchingSchemeRates,
    schemeRates,
    formProps,
    summary,
  } = useCreateInvestment()

  if (isFetchingSchemeRates || !schemeRates) {
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
        {/* chart */}
      </div>

      <InvestmentSummary {...summary} />
    </section>
  );
}
