import {
  use,
  useEffect,
  useState,
} from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { toast } from "sonner";

import type { InvestmentSchema } from "@app/schemas/schemes";

import { InvestmentContext } from "@contexts/InvestmentList";
import { useAuthRefreshQuery } from "@hooks/useAuthRefreshQuery";
import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";
import { queryClient } from "@/TRPCQueryProvider";

const LIMIT = 12;

export default function useListInvestment() {
  const {
    investments,
    page,
    sortBy,
    sortOrder,
    setInvestments,
    setPage,
  } = use(InvestmentContext);

  const [endOfListRef, entry] = useIntersectionObserver({ threshold: 0 });

  const [endOfList, setEndOfList] = useState(false);

  const trpc = useTRPC();
  const {
    data,
    isFetchingData,
  } = useAuthRefreshQuery(trpc.investment.list.queryOptions({
    limit: LIMIT,
    page,
    sortBy,
    sortOrder,
  }));

  useEffect(() => {
    if (!data) return;
    if (data.length !== LIMIT) {
      setEndOfList(true);
    }

    setInvestments((investments) => {
      return [
        ...investments,
        ...data.map(({ updatedAt, ...data }) => ({
          ...data,
          updatedAt: new Date(updatedAt),
        })),
      ];
    });
  }, [
    data,
  ]);

  useEffect(() => {
    if (
      endOfList ||
      isFetchingData ||
      page * LIMIT !== investments.length ||
      !entry?.isIntersecting
    ) return;
    setPage((prev) => prev + 1);
  }, [
    entry,
    isFetchingData,
    page,
    investments,
    endOfList,
  ]);

  const mutation = useAuthRefreshMutation(trpc.investment.delete.mutationOptions({
    onSuccess: () => {
      setInvestments([]);
      queryClient.invalidateQueries({
        queryKey: trpc.investment.list.queryKey(),
      });
    },
    onError: (error) => {
      const [formError] = (error.shape?.formErrors ?? []) as Array<string>;
      toast.error(formError ?? error.message);
    },
  }));

  const handleDelete = (id: InvestmentSchema["id"]) => mutation.mutate({ id });

  return {
    investments,
    isFetchingData,
    isDeleting: mutation.isSubmittingData,
    endOfListRef,
    handleDelete,
  };
}
