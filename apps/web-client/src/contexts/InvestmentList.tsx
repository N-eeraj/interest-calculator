import {
  createContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";

import { SortByOption } from "@app/definitions/enums/sort";
import type { InvestmentListSchema } from "@app/schemas/schemes";


interface InvestmentContext {
  investments: InvestmentListSchema;
  page: number;
  sortBy: SortByOption;
  sortOrder: "asc" | "desc";
  setInvestments: React.Dispatch<React.SetStateAction<InvestmentListSchema>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSortBy: React.Dispatch<React.SetStateAction<SortByOption>>;
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

export const InvestmentContext = createContext<InvestmentContext>({
  investments: [],
  page: 1,
  sortBy: SortByOption.DATE,
  sortOrder: "desc",
  setInvestments: () => {},
  setPage: () => {},
  setSortBy: () => {},
  setSortOrder: () => {},
});

export default function InvestmentContextProvider({ children }: PropsWithChildren) {
  const [investments, setInvestments] = useState<InvestmentListSchema>([]);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortByOption>(SortByOption.DATE);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setInvestments([]);
    setPage(1);
  }, [
    sortBy,
    sortOrder,
  ]);

  const values = {
    investments,
    page,
    sortBy,
    sortOrder,
    setInvestments,
    setPage,
    setSortBy,
    setSortOrder,
  };

  return (
    <InvestmentContext value={values}>
      {children}
    </InvestmentContext>
  );
}
