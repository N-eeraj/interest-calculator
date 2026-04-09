import { createFileRoute } from "@tanstack/react-router";
import DsSpinner from "@components/ds/Spinner";
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
      <DsSpinner />
    );
  }

  return (
    <>
      {JSON.stringify(data)}
    </>
  );
}
