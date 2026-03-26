import type { SubmitEvent } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  passwordUpdateSchema,
  type PasswordUpdateSchema,
} from "@app/schemas/profile";

import { queryClient } from "@/TRPCQueryProvider";
import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

export default function usePasswordUpdate() {
  const trpc = useTRPC();

  const form = useForm({
    defaultValues: {
      password: "",
      newPassword:  "",
    } satisfies PasswordUpdateSchema,
    validators: {
      onSubmit: passwordUpdateSchema,
    },
    onSubmit: ({ value }) => mutation.mutate(value),
  });

  const mutation = useAuthRefreshMutation(trpc.profile.passwordUpdate.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.auth.me.queryOptions().queryKey,
      });
      toast.success("Updated profile details");
    },
    onError: (error) => {
      console.log(error);
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
