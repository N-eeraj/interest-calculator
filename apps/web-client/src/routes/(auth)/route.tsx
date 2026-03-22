import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "@utils/tokens";

function clearTokensAndLogout() {
  removeAccessToken();
  removeRefreshToken();

  throw redirect({
    to: "/login",
    search: { redirect: location.href },
  });
}

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
      try {
        const {
          accessToken
        } = await context.queryClient.fetchQuery({
          queryKey: ["auth.refresh"],
          queryFn: () => context.trpc.auth.refresh.query({ refreshToken }),
          staleTime: 0,
        });
        setAccessToken(accessToken);
      } catch {
        clearTokensAndLogout();
      }
    }

    // validate token
    try {
      await context.queryClient.fetchQuery({
        queryKey: ["auth.me"],
        queryFn: () => context.trpc.auth.me.query(),
        staleTime: 0,
      });
    } catch (error) {
      clearTokensAndLogout();
    }
  },
  component: () => <Outlet />,
});
