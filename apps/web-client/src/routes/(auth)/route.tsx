import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import {
  getCookie,
  setCookie,
  removeCookie,
} from "@utils/cookies";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async ({ context, location }) => {
    const accessToken = getCookie("accessToken");
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
    if (!accessToken) {
      try {
        const {
          accessToken
        } = await context.queryClient.fetchQuery({
          queryKey: ["auth.refresh"],
          queryFn: () => context.trpc.auth.refresh.query({ refreshToken }),
          staleTime: 0,
        });
        setCookie("accessToken", accessToken, { maxAge: 900 }); // 15 minutes
      } catch {
        // log user out and redirect to login if failed
        removeCookie("refreshToken");
  
        throw redirect({
          to: "/login",
          search: { redirect: location.href },
        });
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
