import InvestmentList from "@components/investment/List/Data";
import Investment from "@components/investment/List/Filter";
import InvestmentContextProvider from "@contexts/InvestmentList";

export default function InvestmentListContainer() {
  return (
    <section className="space-y-4">
      <InvestmentContextProvider>
        <Investment />
        <InvestmentList />
      </InvestmentContextProvider>
    </section>
  );
}
