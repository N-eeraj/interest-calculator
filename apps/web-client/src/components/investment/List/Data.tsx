import {
  use,
  useEffect,
  useState,
} from "react";
import { Link } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";

import DsSpinner from "@components/ds/Spinner";
import InvestmentCard from "@components/investment/List/Card";
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
        {investments.map((investment) => (
          <li key={investment.id}>
            <Link
              to={"/investments/$investmentId"}
              params={{ investmentId: String(investment.id) }}>
              <InvestmentCard {...investment} />
            </Link>
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
