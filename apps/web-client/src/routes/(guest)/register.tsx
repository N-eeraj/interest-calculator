import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import RegisterForm from "@components/auth/register/Form";
import DsCard from "@components/ds/Card";

export const Route = createFileRoute("/(guest)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex justify-center items-center min-h-lvh">
      <DsCard className="flex flex-col items-center gap-y-12 sm:gap-y-8 w-11/12 max-w-xs sm:max-w-sm max-sm:px-0 max-sm:bg-transparent max-sm:shadow-none max-sm:dark:shadow-none">
        <RegisterForm className="w-full" />

        <div className="flex justify-center items-center gap-x-1 w-full text-sm">
          <span className="text-foreground">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="text-primary font-bold">
            Login
          </Link>
        </div>
      </DsCard>
    </main>
  );
}
