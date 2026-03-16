import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import TRPCQueryProvider, {
  queryClient,
  trpc,
} from "@/TRPCQueryProvider";
import TanStackDevTools from "@components/TanStackDevTools";

interface RouterContext {
  queryClient: typeof queryClient;
  trpc: typeof trpc;
}

export default function RootLayout() {
  return (
    <TRPCQueryProvider>
      <Outlet />
      <TanStackDevTools />
    </TRPCQueryProvider>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout });
