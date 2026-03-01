import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async ({ context, location }) => {
    const token = localStorage.getItem("token");

    // check token in localstorage
    if (!token) {
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
        queryFn: () => context.trpc.ping.query(), // [TODO]: replace ping with auth.me
        staleTime: 0,
      });
    } catch (error) {
      // log user out and redirect to login if failed
      localStorage.removeItem("token");

      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => <Outlet />,
});
