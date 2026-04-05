import {
  use,
  useEffect,
  useState,
} from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";

import DsSpinner from "@components/ds/Spinner";
import { InvestmentContext } from "@contexts/InvestmentList";
import { useAuthRefreshQuery } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

const LIMIT = 12;

export default function Data() {
  const {
    investments,
    page,
    sortBy,
    sortOrder,
    setInvestments,
    setPage,
  } = use(InvestmentContext);

  const [ref, entry] = useIntersectionObserver({ threshold: 0 });

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
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {investments.map(({ id }) => (
          <li
            key={id}
            className="h-48 outline">
            {id}
          </li>
        ))}
      </ul>

      <div ref={ref}>
        {isFetchingData && (
          <DsSpinner />
        )}
      </div>
    </>
  );
}
