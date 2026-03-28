import { createFileRoute } from "@tanstack/react-router"
import DsButton from "@components/ds/Button";
import DsInput from "@components/ds/Input";
import DsErrorMessage from "@components/ds/ErrorMessage";
import usePasswordUpdate from "@hooks/profile/usePasswordUpdate";

export const Route = createFileRoute("/(auth)/profile/update-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    isSubmitting,
    form,
    onSubmit,
  } = usePasswordUpdate();

  return (  
    <form
      inert={isSubmitting}
      className={"flex flex-col gap-y-4 w-11/12 max-w-sm mx-auto"}
      onSubmit={onSubmit}>
      <form.Field
        name="password"
        children={(field) => (
          <div className="space-y-1">
            <DsInput
              name={field.name}
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={field.state.value as string}
              onChange={(e) => field.handleChange(e.target.value)} />

            {!field.state.meta.isValid && (
              <DsErrorMessage errors={field.state.meta.errors} />
            )}
          </div>
        )}
      />
      <form.Field
        name="newPassword"
        children={(field) => (
          <div className="space-y-1">
            <DsInput
              name={field.name}
              type="password"
              label="New Password"
              placeholder="Enter new password"
              value={field.state.value as string}
              onChange={(e) => field.handleChange(e.target.value)} />

            {!field.state.meta.isValid && (
              <DsErrorMessage errors={field.state.meta.errors} />
            )}
          </div>
        )}
      />

      <DsButton
        loading={isSubmitting}
        className="mt-4">
        Update
      </DsButton>
    </form>
  );
}
