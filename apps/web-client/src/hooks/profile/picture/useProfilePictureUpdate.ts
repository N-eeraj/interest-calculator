import {
  useId,
  useState,
  type ChangeEvent,
} from "react";
import z from "zod";
import { toast } from "sonner";

import { profilePictureSchema } from "@app/schemas/profile";

import { queryClient } from "@/TRPCQueryProvider";
import useProfile from "@hooks/profile/useProfile";
import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

export default function useProfilePictureUpdate() {
  const trpc = useTRPC();
  const { data } = useProfile();

  const [tempUrl, setTempUrl] = useState<string | null>(null);
  const profilePictureInputId = useId();

  const avatarImage = tempUrl ?? data?.avatarUrl;
  const initials = data?.name.split(" ").map(([initial]) => initial).slice(0, 2);

  const updateProfilePictureMutation = useAuthRefreshMutation(trpc.profile.avatar.update.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.auth.me.queryKey(),
      });
      setTempUrl(null);
    },
    onError: (error) => {
      const [formError] = (error.shape?.formErrors ?? []) as Array<string>;
      toast.error(formError ?? error.message);
      setTempUrl(null);
    },
  }));

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    if (!file) return;
    event.target.value = "";

    const {
      data,
      error,
    } = profilePictureSchema.safeParse(file);

    if (error) {
      const [errorMessage] = z.treeifyError(error).errors;
      toast.error(errorMessage);
    }
    if (!data) return;

    setTempUrl(URL.createObjectURL(data));
    updateProfilePictureMutation.mutate(data);
  };

  return {
    profile: data,
    profilePictureInputId,
    avatarImage,
    initials,
    isUpdating: updateProfilePictureMutation.isSubmittingData,
    handleFileSelect,
  };
}
