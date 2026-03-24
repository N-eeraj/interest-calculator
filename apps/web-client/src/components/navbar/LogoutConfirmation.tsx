import type { ComponentProps } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { queryClient } from "@/TRPCQueryProvider";
import DsButton from "@components/ds/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";
import { getRefreshToken, removeAccessToken, removeRefreshToken } from "@utils/tokens";

export default function LogoutConfirmation({ ...props }: ComponentProps<typeof Dialog>) {
  const trpc = useTRPC();
  const navigate = useNavigate();
  const refreshToken = getRefreshToken();

  const mutation = useAuthRefreshMutation(trpc.auth.logout.mutationOptions({
    onSuccess: () => {
      removeAccessToken();
      removeRefreshToken();

      queryClient.invalidateQueries({
        queryKey: trpc.auth.me.queryOptions().queryKey,
      });

      navigate({
        to: "/login",
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }));

  const confirmLogout = () => {
    mutation.mutate({
      refreshToken,
    });
  };

  const isLoggingOut = mutation.isPending || mutation.isRefreshingToken;

  return (
    <Dialog
      {...props}>
      <DialogContent
        className="sm:max-w-sm"
        onInteractOutside={(e) => isLoggingOut && e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            Confirm Logout
          </DialogTitle>
          <DialogDescription>
            You are about to log out from this device.
            Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <DsButton
              disabled={isLoggingOut}
              variant="secondary-outline">
              Cancel
            </DsButton>
          </DialogClose>
          <DsButton
            variant="destructive"
            loading={isLoggingOut}
            onClick={confirmLogout}>
            Logout
          </DsButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
