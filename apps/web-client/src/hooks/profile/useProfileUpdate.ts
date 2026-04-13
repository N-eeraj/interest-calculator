import type { SubmitEvent } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  profileUpdateSchema,
  type ProfileUpdate,
} from "@app/schemas/profile";

import { queryClient } from "@/TRPCQueryProvider";
import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import useProfile from "@hooks/profile/useProfile";
import { useTRPC } from "@utils/trpc";
import handleFormError from "@utils/handleError";

export default function useProfileUpdate() {
  const trpc = useTRPC();
  const { data } = useProfile();

  const form = useForm({
    defaultValues: {
      name: data?.name ?? "",
      email: data?.email ?? "",
    } satisfies ProfileUpdate,
    validators: {
      onSubmit: profileUpdateSchema,
    },
    onSubmit: ({ value }) => mutation.mutate(value),
  });

  const mutation = useAuthRefreshMutation(trpc.profile.update.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.auth.me.queryKey(),
      });
      toast.success("Updated profile details");
    },
    onError: (error) => {
      handleFormError(form, error);
    },
  }));

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  return {
    form,
    onSubmit,
    isSubmitting: mutation.isSubmittingData,
  };
}
