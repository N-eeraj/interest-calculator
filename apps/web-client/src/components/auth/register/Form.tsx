import Input from "@components/ds/Input";
import Button from "@components/ds/Button";
import DsErrorMessage from "@components/ds/ErrorMessage";
import useRegister from "@hooks/auth/useRegister";
import clsx from "clsx";

interface Props {
  className?: string;
}

export default function RegisterForm({ className }: Props) {
  const {
    mutation,
    form,
    onSubmit,
  } = useRegister();

  return (
    <form
      className={clsx(
        "flex flex-col gap-y-4",
        className,
      )}
      onSubmit={onSubmit}>
      <form.Field
        name="name"
        children={(field) => (
          <div className="space-y-1">
            <Input
              name={field.name}
              label="Full Name"
              placeholder="Enter your name"
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
          </div>
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <div className="space-y-1">
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
          </div>
        )}
      />

      <Button
        loading={mutation.isPending}
        className="mt-2">
        Submit
      </Button>
    </form>
  );
}
