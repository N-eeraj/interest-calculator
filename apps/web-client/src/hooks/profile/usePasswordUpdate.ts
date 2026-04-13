import type { SubmitEvent } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import {
  passwordUpdateSchema,
  type PasswordUpdate,
} from "@app/schemas/profile";

import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";
import handleFormError from "@utils/handleError";

export default function usePasswordUpdate() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      password: "",
      newPassword:  "",
    } satisfies PasswordUpdate,
    validators: {
      onSubmit: passwordUpdateSchema,
    },
    onSubmit: ({ value }) => mutation.mutate(value),
  });

  const mutation = useAuthRefreshMutation(trpc.profile.passwordUpdate.mutationOptions({
    onSuccess: () => {
      toast.success("Updated password");
      navigate({
        to: "/profile",
      });
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
