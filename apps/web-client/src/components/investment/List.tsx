import {
  useState,
  useEffect,
} from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";

import { SortByOption } from "@app/definitions/enums/sort";
import type { InvestmentListSchema } from "@app/schemas/schemes";

import DsSpinner from "@components/ds/Spinner";
import { useAuthRefreshQuery } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

const LIMIT = 12;

export default function InvestmentList() {
  const [ref, entry] = useIntersectionObserver({ threshold: 0 });

  const [investments, setInvestments] = useState<InvestmentListSchema>([]);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(SortByOption.DATE);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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

  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
      {investments.map(({ id }) => (
        <div
          key={id}
          className="h-48 outline">
          {id}
        </div>
      ))}

      <div ref={ref}>
        {isFetchingData && (
          <DsSpinner />
        )}
      </div>
    </section>
  );
}
