import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import {
  getCookie,
  removeCookie,
} from "@utils/cookies";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async ({ context, location }) => {
    const refreshToken = getCookie("refreshToken");

    // check tokens in cookies
    if (!refreshToken) {
      removeCookie("accessToken");
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }

    // validate token
    try {
      await context.queryClient.fetchQuery({
        queryKey: ["auth.me"],
        queryFn: () => context.trpc.auth.me.query(),
        staleTime: 0,
      });
    } catch (error) {
      // log user out and redirect to login if failed
      removeCookie("accessToken");
      removeCookie("refreshToken");

      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => <Outlet />,
});
