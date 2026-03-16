import type { SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import {
  registrationSchema,
  type RegistrationSchema,
} from "@app/schemas/auth";

import { useTRPC } from "@utils/trpc";

export default function useRegister() {
  const trpc = useTRPC();
  const registerMutation = useMutation(
    trpc.auth.register.mutationOptions({
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
      name: "",
      email: "",
      password: "",
    } satisfies RegistrationSchema,
    validators: {
      onSubmit: registrationSchema,
    },
    onSubmit: ({ value }) => registerMutation.mutate(value),
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
