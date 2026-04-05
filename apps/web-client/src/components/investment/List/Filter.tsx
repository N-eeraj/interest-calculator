import { use } from "react";

import { ArrowUpwardW700 } from "@material-symbols-svg/react/rounded/icons/arrow-upward";
import { ArrowDownwardW700 } from "@material-symbols-svg/react/rounded/icons/arrow-downward";
import { LucideChevronDown } from "lucide-react";

import { SORT_BY_OPTIONS } from "@app/definitions/constants/map";

import DsButton from "@components/ds/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { InvestmentContext } from "@contexts/InvestmentList";

export default function Filter() {
  const {
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
  } = use(InvestmentContext);

  const sortByOptions = Object.keys(SORT_BY_OPTIONS) as Array<keyof typeof SORT_BY_OPTIONS>;

  const toggleSortOrder = () => {
    setSortOrder((order) => order === "asc" ? "desc" : "asc");
  };

  return (
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
  );
}
