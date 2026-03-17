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
                label="Full Name"
                placeholder="Enter your name"
                value={field.state.value as string}
                onChange={(e) => field.handleChange(e.target.value)} />

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
                type="email"
                label="Email"
                placeholder="Enter email address"
                value={field.state.value as string}
                onChange={(e) => field.handleChange(e.target.value)} />

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
                label="Password"
                placeholder="Enter password"
                value={field.state.value as string}
                onChange={(e) => field.handleChange(e.target.value)} />

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
