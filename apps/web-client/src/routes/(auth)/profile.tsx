import { createFileRoute } from "@tanstack/react-router"

import ProfileUpdateForm from "@components/profile/Form";
import useProfile from "@hooks/profile/useProfile";

export const Route = createFileRoute("/(auth)/profile")({
  component: RouteComponent,
})

function RouteComponent() {
  const { isFetchingData } = useProfile();

  if (isFetchingData) return;

  return (
    <section>
      <ProfileUpdateForm />
    </section>
  );
}
