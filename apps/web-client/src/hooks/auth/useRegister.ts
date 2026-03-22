import type { SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";

import {
  registrationSchema,
  type RegistrationSchema,
} from "@app/schemas/auth";

import { useTRPC } from "@utils/trpc";
import handleFormError from "@utils/handleError";
import { setCookie } from "@utils/cookies";

export default function useRegister() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const mutation = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        handleFormError(form, error);
      },
      onSuccess: ({ accessToken, refreshToken }) => {
        setCookie("accessToken", accessToken, { maxAge: 900 }); // 15 minutes
        setCookie("refreshToken", refreshToken, { maxAge: 25_92_000 }); // 30 days

        navigate({
          href: "/",
        });
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
    onSubmit: ({ value }) => mutation.mutate(value),
  });

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  return {
    mutation,
    form,
    onSubmit,
  };
}
