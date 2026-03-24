import { createFileRoute } from "@tanstack/react-router"

import DsInput from "@components/ds/Input";
import DsButton from "@components/ds/Button";
import DsErrorMessage from "@components/ds/ErrorMessage";
import useProfileUpdate from "@hooks/profile/useProfileUpdate";

export const Route = createFileRoute("/(auth)/profile")({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    isFetchingData,
    form,
    onSubmit,
    isSubmitting,
  } = useProfileUpdate();

  if (isFetchingData) return;

  return (
    <>
      <form
        inert={isSubmitting}
        className="flex flex-col gap-y-4 max-w-sm mx-auto"
        onSubmit={onSubmit}>
        <form.Field
          name="name"
          children={(field) => (
            <div className="space-y-1">
              <DsInput
                name={field.name}
                label="Email"
                placeholder="Enter name"
                value={field.state.value as string}
                onChange={(e) => field.handleChange(e.target.value)} />
  
              {!field.state.meta.isValid && (
                <DsErrorMessage errors={field.state.meta.errors} />
              )}
            </div>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <div className="space-y-1">
              <DsInput
                name={field.name}
                type="email"
                label="Email"
                placeholder="Enter email address"
                value={field.state.value as string}
                onChange={(e) => field.handleChange(e.target.value)} />
  
              {!field.state.meta.isValid && (
                <DsErrorMessage errors={field.state.meta.errors} />
              )}
            </div>
          )}
        />
  
        <DsButton loading={isSubmitting}>
          Update
        </DsButton>
      </form>
    </>
  );
}
