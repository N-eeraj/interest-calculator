import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

export default function RouteComponent() {
  const trpc = useTRPC();
  const {
    data,
    isPending,
  } = useQuery(
    trpc.ping.queryOptions()
  );

  if (isPending) {
    return "Loading...";
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
