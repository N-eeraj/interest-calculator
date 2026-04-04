import {
  useState,
  useEffect,
} from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { ArrowUpwardW700 } from "@material-symbols-svg/react/rounded/icons/arrow-upward";
import { ArrowDownwardW700 } from "@material-symbols-svg/react/rounded/icons/arrow-downward";
import { LucideChevronDown } from "lucide-react";

import { SortByOption } from "@app/definitions/enums/sort";
import type { InvestmentListSchema } from "@app/schemas/schemes";
import { SORT_BY_OPTIONS } from "@app/definitions/constants/map";

import DsButton from "@components/ds/Button";
import DsSpinner from "@components/ds/Spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useAuthRefreshQuery } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

const LIMIT = 12;

export default function InvestmentList() {
  const [ref, entry] = useIntersectionObserver({ threshold: 0 });

  const [investments, setInvestments] = useState<InvestmentListSchema>([]);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortByOption>(SortByOption.DATE);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [endOfList, setEndOfList] = useState(false);

  const sortByOptions = Object.keys(SORT_BY_OPTIONS) as Array<keyof typeof SORT_BY_OPTIONS>;

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

  const toggleSortOrder = () => {
    setSortOrder((order) => order === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    setInvestments([]);
    setPage(1);
  }, [
    sortBy,
    sortOrder,
  ]);

  return (
    <section className="space-y-4">
      <div className="flex justify-end items-center gap-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DsButton
            variant="outline"
            className="pl-3 pr-1.5!">
            {SORT_BY_OPTIONS[sortBy]}
            <span className="sr-only">
              Sort By
            </span>
            <LucideChevronDown />
          </DsButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortByOptions.map((optionKey) => (
            <DropdownMenuItem
              key={optionKey}
              onClick={() => setSortBy(optionKey)}>
              {SORT_BY_OPTIONS[optionKey]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

        <DsButton
          size="icon"
          className="p-0"
          onClick={toggleSortOrder}>
          {sortOrder === "asc"
            ? <ArrowUpwardW700 />
            : <ArrowDownwardW700 />
          }
        </DsButton>
      </div>

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
    </section>
  );
}
