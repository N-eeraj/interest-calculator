import { use } from "react";
import { PhotoW500 } from "@material-symbols-svg/react/icons/photo";
import { DeleteW500 } from "@material-symbols-svg/react/icons/delete";
import clsx from "clsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import DeleteConfirmation from "@components/profile/picture/DeleteConfirmation";
import { ProfilePictureContext } from "@contexts/ProfilePicture";
import useProfilePictureUpdate from "@hooks/profile/picture/useProfilePictureUpdate";

export default function ProfilePicture() {
  const {
    isRemoving,
    setIsRemoveConfirmationOpen,
  } = use(ProfilePictureContext);

  const {
    profile,
    profilePictureInputId,
    avatarImage,
    initials,
    isUpdating,
    handleFileSelect,
  } = useProfilePictureUpdate();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          disabled={isUpdating || isRemoving}
          className={clsx(
            "w-1/2 max-w-40 aspect-square rounded-full outline-2 outline-primary drop-shadow-xl drop-shadow-secondary/50",
            (isUpdating || isRemoving) ? "cursor-not-allowed opacity-75" : "cursor-pointer"
          )}>
          {avatarImage
            ? (
              <img
                src={avatarImage}
                alt={profile?.name} />
            )
            : (
              <div className="grid place-content-center bg-card text-primary text-4xl font-semibold tracking-widest">
                {initials}
              </div>
            )
          }
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem className="p-0 hover:bg-card-foreground/10! hover:text-card-foreground! duration-100">
            <label
              htmlFor={profilePictureInputId}
              className="flex items-center gap-2 size-full px-2 py-1.5">
              <PhotoW500 />
              <span>
                Select Image
              </span>
            </label>
          </DropdownMenuItem>

          {avatarImage && (
            <DropdownMenuItem
              className="group hover:bg-destructive/60! hover:text-white! duration-100 cursor-pointer"
              onClick={() => setIsRemoveConfirmationOpen(true)}>
              <DeleteW500 className="text-red-400 group-hover:text-white dark:group-hover:text-red-200" />
              <span>
                Remove Image
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* file selection input */}
      <input
        id={profilePictureInputId}
        type="file"
        className="hidden"
        onChange={handleFileSelect} />

      <DeleteConfirmation />
    </>
  );
}
