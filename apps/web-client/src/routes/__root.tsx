import {
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TRPCQueryProvider from "@/TRPCQueryProvider";

export default function RootLayout() {

  return (
    <TRPCQueryProvider>
      <Outlet />
      <TanStackRouterDevtools />
    </TRPCQueryProvider>
  );
}

export const Route = createRootRoute({ component: RootLayout });
