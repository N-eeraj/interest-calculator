import InvestmentList from "@components/investment/List/Data";
import InvestmentFilter from "@components/investment/List/Filter";
import InvestmentContextProvider from "@contexts/InvestmentList";

export default function InvestmentListContainer() {
  return (
    <section className="flex flex-col gap-y-4 flex-1">
      <InvestmentContextProvider>
        <InvestmentFilter />
        <InvestmentList />
      </InvestmentContextProvider>
    </section>
  );
}
