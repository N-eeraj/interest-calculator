import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { registrationSchema } from "@app/schemas/auth";

import { useTRPC } from "@utils/trpc";
import type { SubmitEventHandler } from "react";

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

  return (
    <div>Hello "/register"!</div>
  );
}
