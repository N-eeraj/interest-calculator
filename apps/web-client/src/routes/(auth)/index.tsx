import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";
import { AddW600 } from "@material-symbols-svg/react/rounded/icons/add";

import DsButton from "@components/ds/Button";
import { useAuthRefreshQuery } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

export const Route = createFileRoute("/(auth)/")({
  component: RouteComponent,
});

export default function RouteComponent() {
  const trpc = useTRPC();
  const {
    data,
    isFetchingData,
  } = useAuthRefreshQuery(trpc.investment.list.queryOptions({

  }));

  if (isFetchingData) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      {JSON.stringify(data)}

      <Link
        to="/investments/create"
        className="fixed bottom-3 right-3">
        <DsButton
          variant="secondary"
          className="size-12">
          <AddW600 className="size-8" />
        </DsButton>
      </Link>
    </div>
  );
}
