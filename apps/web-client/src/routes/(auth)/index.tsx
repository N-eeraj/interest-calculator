import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";
import { AddW600 } from "@material-symbols-svg/react/rounded/icons/add";

import InvestmentList from "@components/investment/List";
import DsButton from "@components/ds/Button";

export const Route = createFileRoute("/(auth)/")({
  component: RouteComponent,
});

export default function RouteComponent() {

  return (
    <>
      <InvestmentList />

      <Link
        to="/investments/create"
        className="fixed bottom-4 right-4">
        <DsButton
          variant="secondary"
          className="size-12">
          <AddW600 className="size-8" />
        </DsButton>
      </Link>
    </>
  );
}
