import {
  useId,
  useState,
  type ChangeEvent,
} from "react";
import z from "zod";
import { PhotoW500 } from "@material-symbols-svg/react/icons/photo";
import { DeleteW500 } from "@material-symbols-svg/react/icons/delete";
import { toast } from "sonner";
import clsx from "clsx";

import { profilePictureSchema } from "@app/schemas/profile";

import { queryClient } from "@/TRPCQueryProvider";
import DsButton from "@components/ds/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import useProfile from "@hooks/profile/useProfile";
import { useAuthRefreshMutation } from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

export default function ProfilePicture() {
  const trpc = useTRPC();
  const { data } = useProfile();

  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState<string | null>(null);
  const profilePictureInputId = useId();

  const avatarImage = tempUrl ?? data?.avatarUrl;
  const initials = data?.name.split(" ").map(([initial]) => initial).slice(0, 2);

  const updateProfilePictureMutation = useAuthRefreshMutation(trpc.profile.picture.update.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.auth.me.queryOptions().queryKey,
      });
      setTempUrl(null);
    },
    onError: (error) => {
      const [formError] = (error.shape?.formErrors ?? []) as Array<string>;
      toast.error(formError ?? error.message);
      setTempUrl(null);
    },
  }));

  const deleteProfilePictureMutation = useAuthRefreshMutation(trpc.profile.picture.delete.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.auth.me.queryOptions().queryKey,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }));

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    if (!file) return;
    event.target.value = "";

    const {
      data,
      error,
    } = profilePictureSchema.safeParse(file);

    if (error) {
      const [errorMessage] = z.treeifyError(error).errors;
      toast.error(errorMessage);
    }
    if (!data) return;

    setTempUrl(URL.createObjectURL(data));
    updateProfilePictureMutation.mutate(data);
  };

  const confirmRemove = () => {
    deleteProfilePictureMutation.mutate();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          disabled={updateProfilePictureMutation.isSubmittingData || deleteProfilePictureMutation.isSubmittingData}
          className={clsx(
            "w-1/2 max-w-40 aspect-square rounded-full outline-2 outline-primary drop-shadow-xl drop-shadow-secondary/50",
            (updateProfilePictureMutation.isSubmittingData || deleteProfilePictureMutation.isSubmittingData) ? "cursor-not-allowed opacity-75" : "cursor-pointer"
          )}>
          {avatarImage
            ? (
              <img
                src={avatarImage}
                alt={data?.name} />
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

      {/* delete picture confirmation */}
      <Dialog
        open={isRemoveConfirmationOpen}
        onOpenChange={setIsRemoveConfirmationOpen}>
        <DialogContent
          className="sm:max-w-sm"
          onInteractOutside={(e) => deleteProfilePictureMutation.isSubmittingData && e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>
              Remove Picture
            </DialogTitle>
            <DialogDescription>
              You are about to remove your profile picture.
              Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <DsButton
                disabled={deleteProfilePictureMutation.isSubmittingData}
                variant="secondary-outline">
                Cancel
              </DsButton>
            </DialogClose>
            <DsButton
              variant="destructive"
              loading={deleteProfilePictureMutation.isSubmittingData}
              onClick={confirmRemove}>
              Remove
            </DsButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
