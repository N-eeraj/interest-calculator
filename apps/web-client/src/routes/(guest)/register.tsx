import { createFileRoute } from "@tanstack/react-router";

import Input from "@components/ds/Input";
import Button from "@components/ds/Button";
import DsErrorMessage from "@components/ds/ErrorMessage";
import useRegister from "@hooks/auth/useRegister";

export const Route = createFileRoute("/(guest)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    form,
    onSubmit,
  } = useRegister();

  return (
    <>
      <form onSubmit={onSubmit}>
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
                <DsErrorMessage errors={field.state.meta.errors} />
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
                <DsErrorMessage errors={field.state.meta.errors} />
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
                <DsErrorMessage errors={field.state.meta.errors} />
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
