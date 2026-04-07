import {
  use,
  useEffect,
  useState,
} from "react";
import { Link } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { AccountBalanceFillW500 } from "@material-symbols-svg/react/icons/account-balance";

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

  if (!investments.length) {
    return (
      <section className="flex flex-col justify-center items-center gap-y-2 flex-1">
        <AccountBalanceFillW500 className="size-32 text-secondary/50" />
        <span className="text-secondary text-2xl font-medium">
          No Investments to show
        </span>
      </section>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {investments.map((investment) => (
          <li key={investment.id}>
            <Link
              to={"/investments/$investmentId"}
              params={{ investmentId: String(investment.id) }}>
              <InvestmentCard
                {...investment}
                onRefresh={() => setInvestments([])} />
            </Link>
          </li>
        ))}
      </ul>

      <div ref={endOfListRef}>
        {isFetchingData && (
          <DsSpinner />
        )}
      </div>
    </>
  );
}
