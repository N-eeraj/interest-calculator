import type { SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import {
  loginSchema,
  type LoginSchema,
} from "@app/schemas/auth";

import { useTRPC } from "@utils/trpc";

export default function useLogin() {
  const trpc = useTRPC();
  const loginMutation = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        console.log(error.message);
      },
      onSuccess: (response) => {
        console.log(response);
      },
    })
  );

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies LoginSchema,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => loginMutation.mutate(value),
  });

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  return {
    form,
    onSubmit,
  };
}
