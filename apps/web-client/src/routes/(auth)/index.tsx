import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/")({
  component: RouteComponent,
});

export default function RouteComponent() {
  return (
    <div>
      Home Page
    </div>
  );
}
