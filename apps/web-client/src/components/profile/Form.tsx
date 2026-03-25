import type { HTMLAttributes } from "react";
import clsx from "clsx";

import DsInput from "@components/ds/Input";
import DsButton from "@components/ds/Button";
import DsErrorMessage from "@components/ds/ErrorMessage";
import useProfileUpdate from "@hooks/profile/useProfileUpdate";

type Props = Pick<HTMLAttributes<HTMLFormElement>, "className">;

export default function ProfileUpdateForm({ className }: Props) {
  const {
    form,
    onSubmit,
    isSubmitting,
  } = useProfileUpdate();

  return (    
      <form
        inert={isSubmitting}
        className={clsx(
          "flex flex-col gap-y-4",
          className,
        )}
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
  
        <DsButton
          loading={isSubmitting}
          className="mt-4">
          Update
        </DsButton>
      </form>
  );
}
