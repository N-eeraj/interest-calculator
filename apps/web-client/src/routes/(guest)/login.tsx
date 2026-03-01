import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>Hello "/login"!</div>
  );
}
