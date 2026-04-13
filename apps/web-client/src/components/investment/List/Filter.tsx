import { use } from "react";

import { ArrowUpwardW700 } from "@material-symbols-svg/react/rounded/icons/arrow-upward";
import { ArrowDownwardW700 } from "@material-symbols-svg/react/rounded/icons/arrow-downward";
import { LucideChevronDown } from "lucide-react";

import { SORT_BY_OPTIONS } from "@app/definitions/constants/map";
import type { SortByOption } from "@app/definitions/enums/sort";

import DsSelect from "@components/ds/Select";
import DsButton from "@components/ds/Button";
import { InvestmentContext } from "@contexts/InvestmentList";

export default function Filter() {
  const {
    investments,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
  } = use(InvestmentContext);

  if (!investments.length) return;

  const sortByOptions = Object.keys(SORT_BY_OPTIONS) as Array<keyof typeof SORT_BY_OPTIONS>;

  const toggleSortOrder = () => {
    setSortOrder((order) => order === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex justify-end items-center gap-x-4">
      <DsSelect
        trigger={<SelectTrigger sortBy={sortBy} />}
        triggerProps={{
          className: "pl-3 pr-1.5!",
        }}
        options={sortByOptions}
        optionRender={(optionKey) => <span className="capitalize">{SORT_BY_OPTIONS[optionKey]}</span>}
        onSelect={setSortBy} />

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
  );
}

function SelectTrigger({ sortBy }: { sortBy: SortByOption }) {
  return (
    <>
      {SORT_BY_OPTIONS[sortBy]}
      <span className="sr-only">
        Sort By
      </span>
      <LucideChevronDown />
    </>
  );
}
