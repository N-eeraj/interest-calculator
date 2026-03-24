import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import LogoutConfirmation from "@components/navbar/LogoutConfirmation";
import DsButton from "@components/ds/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DsButton
            loading={isLoading}
            variant="outline">
            {data?.name}
          </DsButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={navigateToProfile}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsLogoutConfirmationOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutConfirmation
        open={isLogoutConfirmationOpen}
        onOpenChange={(value) => setIsLogoutConfirmationOpen(value)} />
    </>
  );
}
