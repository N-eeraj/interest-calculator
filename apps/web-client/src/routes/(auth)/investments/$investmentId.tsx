import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/investments/$investmentId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { investmentId } = Route.useParams();

  return (
    <>
      {investmentId}
    </>
  );
}
