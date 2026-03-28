import {
  Link,
  createFileRoute,
} from "@tanstack/react-router"

import ProfilePicture from "@components/profile/picture";
import ProfileUpdateForm from "@components/profile/Form";
import DsButton from "@components/ds/Button";
import useProfile from "@hooks/profile/useProfile";
import ProfilePictureContextProvider from "@contexts/ProfilePicture";

export const Route = createFileRoute("/(auth)/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isFetchingData } = useProfile();

  if (isFetchingData) return;

  return (
    <section className="flex flex-col items-center gap-y-8 pt-5">
      <ProfilePictureContextProvider>
        <ProfilePicture />
      </ProfilePictureContextProvider>

      <div className="w-11/12 max-w-sm space-y-6">
        <ProfileUpdateForm />

        <Link to="/profile/update-password">
          <DsButton
            variant="secondary"
            className="w-full">
            Change Password
          </DsButton>
        </Link>
      </div>
    </section>
  );
}
