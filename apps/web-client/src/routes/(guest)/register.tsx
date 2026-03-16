import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import {
  registrationSchema,
  type RegistrationSchema,
} from "@app/schemas/auth";

import Input from "@components/ds/Input";
import Button from "@components/ds/Button";
import { useTRPC } from "@utils/trpc";

export const Route = createFileRoute("/(guest)/register")({
  component: RouteComponent,
});

function RouteComponent() {
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

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}>
        <form.Field
          name="name"
          children={(field) => (
            <>
              <Input
                name={field.name}
                value={field.state.value as string}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Full Name" />

              {!field.state.meta.isValid && (
                <em>
                  {field.state.meta.errors[0]?.message}
                </em>
              )}
            </>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <>
              <Input
                name={field.name}
                value={field.state.value as string}
                type="email"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Email" />

              {!field.state.meta.isValid && (
                <em>
                  {field.state.meta.errors[0]?.message}
                </em>
              )}
            </>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <>
              <Input
                name={field.name}
                type="password"
                value={field.state.value as string}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Password" />

              {!field.state.meta.isValid && (
                <em>
                  {field.state.meta.errors[0]?.message}
                </em>
              )}
            </>
          )}
        />

        <Button>
          Submit
        </Button>
      </form>
    </>
  );
}
