import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import TRPCQueryProvider, {
  queryClient,
  trpc,
} from "@/TRPCQueryProvider";

interface RouterContext {
  queryClient: typeof queryClient;
  trpc: typeof trpc;
}

export default function RootLayout() {
  return (
    <TRPCQueryProvider>
      <Outlet />
      <TanStackRouterDevtools />
    </TRPCQueryProvider>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout });
