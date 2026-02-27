import {
  useQuery,
} from "@tanstack/react-query";
import {
  useTRPC,
} from "@/utils/trpc";

export default function Test() {
  const trpc = useTRPC()
  const {
    data,
    isPending,
  } = useQuery(trpc.ping.queryOptions());

  if (isPending) {
    return "Loading..."
  }

  return (
    <div>
      {data?.data}
    </div>
  );
}
