import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import SplashScreen from "@components/SplashScreen";
import Navbar from "@/components/navbar";
import {
  refreshAccessToken,
  clearTokensAndLogout,
} from "@hooks/useAuthRefreshQuery";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
} from "@utils/tokens";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async ({ context, location }) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    // check tokens in cookies
    if (!refreshToken) {
      removeAccessToken();
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }

    // refresh access token
    if (!accessToken) {
      await refreshAccessToken();
    }

    // validate token
    try {
      await context.queryClient.fetchQuery({
        queryKey: [["auth", "me"], { type: "query" }],
        queryFn: () => context.trpc.auth.me.query(),
        staleTime: 0,
      });
    } catch (error) {
      clearTokensAndLogout();
    }
  },
  pendingComponent: () => <SplashScreen />,
  component: () => {
    return (
      <>
        <Navbar className="sticky top-0 mb-10" />
        <main className="min-h-[calc(100svh-124px)] px-3 md:px-5 pb-8">
          <Outlet />
        </main>
      </>
    );
  },
});
