import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)")({
  beforeLoad: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => <Outlet />,
});
