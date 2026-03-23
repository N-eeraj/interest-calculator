import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "@utils/tokens";

export default function useLogout() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const mutation = useAuthRefreshMutation(trpc.auth.logout.mutationOptions({
    onSuccess: () => {
      removeAccessToken();
      removeRefreshToken();
      navigate({
        href: "/login",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }));

  const refreshToken = getRefreshToken();

  return {
    ...mutation,
    mutate: () => mutation.mutate({ refreshToken }),
  };
}
