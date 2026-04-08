import { Link } from "@tanstack/react-router";
import { AccountBalanceFillW500 } from "@material-symbols-svg/react/icons/account-balance";

import DsSpinner from "@components/ds/Spinner";
import InvestmentCard from "@components/investment/List/Card";
import useListInvestment from "@hooks/investments/useListInvestment";

export default function Data() {
  const {
    investments,
    isFetchingData,
    isDeleting,
    endOfListRef,
    handleDelete,
  } = useListInvestment();

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
                isDeleting={isDeleting}
                onDelete={handleDelete} />
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
