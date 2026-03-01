import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/(auth)/")({
  component: RouteComponent,
});

export default function RouteComponent() {
  const trpc = useTRPC();
  const {
    data,
    isPending,
    error,
  } = useQuery(
    trpc.ping.queryOptions(),
  );

  if (isPending) {
    return "Loading...";
  }

  if (error) {
    return JSON.stringify(error);
  }

  if (!data) return;

  return (
    <div>
      {data.data}
      {data.message}
      {data.success}
    </div>
  );
}
