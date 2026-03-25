import { createFileRoute } from "@tanstack/react-router"

import ProfilePicture from "@components/profile/picture";
import ProfileUpdateForm from "@components/profile/Form";
import useProfile from "@hooks/profile/useProfile";

export const Route = createFileRoute("/(auth)/profile")({
  component: RouteComponent,
})

function RouteComponent() {
  const { isFetchingData } = useProfile();

  if (isFetchingData) return;

  return (
    <section className="flex flex-col items-center gap-y-8 pt-5">
      <ProfilePicture />
      <ProfileUpdateForm className="w-11/12 max-w-sm" />
    </section>
  );
}
