import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import {
  loginSchema,
  type Login,
} from "@app/schemas/auth";

import useAuth from "@hooks/auth/useAuth";
import { useTRPC } from "@utils/trpc";

export default function useLogin() {
  const trpc = useTRPC();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies Login,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => mutation.mutate(value),
  });
  
  const {
    onSubmit,
    onSuccess,
    onError,
  } = useAuth(form);

  const mutation = useMutation(
    trpc.auth.login.mutationOptions({
      onSuccess,
      onError,
    })
  );

  return {
    mutation,
    form,
    onSubmit,
  };
}
