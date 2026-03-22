import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import {
  getAccessToken,
  getRefreshToken,
} from "@utils/tokens";

export const Route = createFileRoute("/(guest)")({
  beforeLoad: async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (accessToken || refreshToken) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => <Outlet />,
});
