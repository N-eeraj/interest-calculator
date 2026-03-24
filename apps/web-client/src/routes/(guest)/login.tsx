import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";
import * as z from "zod";

import LoginForm from "@components/auth/login/Form";
import DsCard from "@components/ds/Card";

const searchSchema = z.object({
  redirect: z.string()
    .optional(),
});

export const Route = createFileRoute("/(guest)/login")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  return (
    <main className="flex justify-center items-center min-h-lvh">
      <DsCard className="flex flex-col items-center gap-y-12 sm:gap-y-8 w-11/12 max-w-xs sm:max-w-sm max-sm:px-0 max-sm:bg-transparent max-sm:shadow-none max-sm:dark:shadow-none">
        <LoginForm className="w-full" />

        <div className="flex justify-center items-center gap-x-1 w-full text-sm">
          <span className="text-foreground">
            Don't have an account?
          </span>
          <Link
            to="/register"
            className="text-primary font-bold">
            Register
          </Link>
        </div>
      </DsCard>
    </main>
  );
}
