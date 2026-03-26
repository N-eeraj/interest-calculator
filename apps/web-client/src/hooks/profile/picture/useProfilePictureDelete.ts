import {
  use,
  useEffect,
} from "react";
import { toast } from "sonner";

import { queryClient } from "@/TRPCQueryProvider";
import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import { ProfilePictureContext } from "@contexts/ProfilePicture";
import { useTRPC } from "@utils/trpc";

export default function useProfilePictureDelete() {
  const trpc = useTRPC();
  const {
    isRemoveConfirmationOpen,
    setIsRemoving,
    setIsRemoveConfirmationOpen,
  } = use(ProfilePictureContext);

  const deleteProfilePictureMutation = useAuthRefreshMutation(trpc.profile.avatar.delete.mutationOptions({
    onSuccess: () => {
      setIsRemoveConfirmationOpen(false);
      queryClient.invalidateQueries({
        queryKey: trpc.auth.me.queryOptions().queryKey,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }));

  useEffect(() => {
    setIsRemoving(deleteProfilePictureMutation.isSubmittingData);
  }, [
    deleteProfilePictureMutation.isSubmittingData,
  ])

  return {
    open: isRemoveConfirmationOpen,
    setIsRemoveConfirmationOpen,
    confirmRemove: () =>  deleteProfilePictureMutation.mutate(),
    isSubmittingData: deleteProfilePictureMutation.isSubmittingData,
  };
}
