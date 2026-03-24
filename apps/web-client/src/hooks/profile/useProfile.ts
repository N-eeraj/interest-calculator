import { useAuthRefreshQuery } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

export default function useProfile() {
  const trpc = useTRPC();
  const {
    data,
    isFetchingData,
  } = useAuthRefreshQuery(trpc.auth.me.queryOptions());

  return {
    data,
    isFetchingData,
  };
}
