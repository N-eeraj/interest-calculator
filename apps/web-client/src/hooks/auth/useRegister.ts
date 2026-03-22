import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import {
  registrationSchema,
  type RegistrationSchema,
} from "@app/schemas/auth";

import useAuth from "@hooks/auth/useAuth";
import { useTRPC } from "@utils/trpc";

export default function useRegister() {
  const trpc = useTRPC();

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

  const {
    onSubmit,
    onSuccess,
    onError,
  } = useAuth(form);

  const mutation = useMutation(
    trpc.auth.register.mutationOptions({
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
