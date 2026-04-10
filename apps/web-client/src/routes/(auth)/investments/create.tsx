import { createFileRoute } from "@tanstack/react-router";
import Investment from "@components/investment";

export const Route = createFileRoute("/(auth)/investments/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Investment />
  );
}
