import { createFileRoute } from "@tanstack/react-router";
import DsSpinner from "@components/ds/Spinner";
import Investment from "@components/investment";
import useFetchInvestment from "@hooks/investments/useFetchInvestment";

export const Route = createFileRoute("/(auth)/investments/$investmentId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { investmentId } = Route.useParams();
  const {
    data,
    isFetchingData,
  } = useFetchInvestment(+investmentId);

  if (isFetchingData) {
    return (
      <section className="grid place-content-center h-[calc(100svh-160px)]">
        <DsSpinner className="size-16" />
      </section>
    );
  }

  return (
    <Investment initialData={data} />
  );
}
