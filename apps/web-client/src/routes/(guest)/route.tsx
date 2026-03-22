import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { getCookie } from "@utils/cookies";

export const Route = createFileRoute("/(guest)")({
  beforeLoad: async () => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (accessToken || refreshToken) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => <Outlet />,
});
