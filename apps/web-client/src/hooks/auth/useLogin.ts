import type { SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";

import {
  loginSchema,
  type LoginSchema,
} from "@app/schemas/auth";

import { useTRPC } from "@utils/trpc";
import handleFormError from "@utils/handleError";
import { setCookie } from "@utils/cookies";

export default function useLogin() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const mutation = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        handleFormError(form, error);
      },
      onSuccess: ({ accessToken,  refreshToken }) => {
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
      email: "",
      password: "",
    } satisfies LoginSchema,
    validators: {
      onSubmit: loginSchema,
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
