import type { SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import {
  registrationSchema,
  type RegistrationSchema,
} from "@app/schemas/auth";

import { useTRPC } from "@utils/trpc";

export default function useRegister() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const mutation = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        if (error.shape?.fieldErrors) {
          Object.entries(error.shape.fieldErrors)
            .forEach(([field, messages]) => {
              if (!Array.isArray(messages)) return;
              form.setFieldMeta(field as FieldName, (prev) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  onServer: messages.map((message) => ({
                    message: String(message),
                  })),
                },
              }));
            })
        } else {
          toast.error((error.shape?.formErrors as Array<string> ?? [])?.[0] || error.message);
        }
      },
      onSuccess: (response) => {
        localStorage.setItem("token", response.token);
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
  type FieldName = keyof typeof form.state.values;

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
