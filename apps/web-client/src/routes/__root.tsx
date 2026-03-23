import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import {
  queryClient,
  trpc,
} from "@/TRPCQueryProvider";
import TanStackDevTools from "@components/TanStackDevTools";
import SplashScreen from "@components/SplashScreen";
import ServerError from "@components/ServerError";
import { Toaster } from "@components/ui/sonner"
import { useTRPC } from "@utils/trpc";

interface RouterContext {
  queryClient: typeof queryClient;
  trpc: typeof trpc;
}

const showDevTools = import.meta.env.VITE_TS_DEV_TOOLS?.toUpperCase() === "TRUE";

export default function RootLayout() {
  const trpc = useTRPC();
  const {
    isPending,
    error,
  } = useQuery(
    trpc.ping.queryOptions(),
  );

  if (isPending) return <SplashScreen />;

  if (error) return <ServerError />;

  return (
    <>
      <Outlet />
      {showDevTools && <TanStackDevTools />}
      <Toaster />
    </>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout });
