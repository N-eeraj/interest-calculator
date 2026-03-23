import { useNavigate } from "@tanstack/react-router";

import DsButton from "@components/ds/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

export default function Profile() {
  const navigate = useNavigate();

  const navigateToProfile = () => navigate({
    to: "/profile",
  });

  const triggerLogoutConfirmation = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DsButton variant="outline">
          Profile
        </DsButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={navigateToProfile}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={triggerLogoutConfirmation}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
