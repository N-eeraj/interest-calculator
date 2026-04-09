import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import type { InvestmentSchema } from "@app/schemas/schemes";

import { useAuthRefreshQuery } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

export default function useFetchInvestment(id: InvestmentSchema["id"]) {
  const navigate = useNavigate();
  const trpc = useTRPC();

  const {
    data,
    error,
    isFetchingData,
  } = useAuthRefreshQuery(trpc.investment.getById.queryOptions({ id }));

  if (error) {
    navigate({
      to: "/",
      replace: true,
    });
    toast.error(error.message);
  }

  return {
    data,
    isFetchingData,
  };
}
