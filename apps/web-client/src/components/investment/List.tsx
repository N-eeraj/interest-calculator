import {
  useState,
  useEffect,
} from "react";

import { SortByOption } from "@app/definitions/enums/sort";
import type { InvestmentListSchema } from "@app/schemas/schemes";

import { useAuthRefreshQuery } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

export default function InvestmentList() {
  const [investments, setInvestments] = useState<InvestmentListSchema>([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(SortByOption.DATE);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [endOfList, setEndOfList] = useState(false);

  const trpc = useTRPC();
  const {
    data,
    isFetchingData,
  } = useAuthRefreshQuery(trpc.investment.list.queryOptions({
    limit,
    page,
    sortBy,
    sortOrder,
  }));

  useEffect(() => {
    if (!data) return;
    if (data.length < limit) {
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

  if (isFetchingData) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return (
    <section>
      {JSON.stringify(investments)}
    </section>
  );
}
