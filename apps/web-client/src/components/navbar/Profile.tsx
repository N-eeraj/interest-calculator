import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import DsSelect from "@components/ds/Select";
import LogoutConfirmation from "@components/navbar/LogoutConfirmation";
import { useTRPC } from "@utils/trpc";

export default function Profile() {
  const trpc = useTRPC();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
  } = useQuery(trpc.auth.me.queryOptions());

  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);

  const navigateToProfile = () => navigate({
    to: "/profile",
  });

  return (
    <>
      <DsSelect
        trigger={data?.name}
        triggerProps={{
          loading: isLoading,
        }}
        options={[
          {
            label: "Profile",
            action: navigateToProfile,
          },
          {
            label: "Logout",
            action: () => setIsLogoutConfirmationOpen(true),
          }
        ]}
        optionRender={({ label }) => label}
        onSelect={({ action }) => action()} />

      <LogoutConfirmation
        open={isLogoutConfirmationOpen}
        onOpenChange={(value) => setIsLogoutConfirmationOpen(value)} />
    </>
  );
}
