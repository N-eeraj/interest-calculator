import DsButton from "@components/ds/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import useProfilePictureDelete from "@hooks/profile/picture/useProfilePictureDelete";

export default function DeleteConfirmation() {
  const {
    open,
    isSubmittingData,
    setIsRemoveConfirmationOpen,
    confirmRemove,
  } = useProfilePictureDelete()

  return (
    <Dialog
      open={open}
      onOpenChange={setIsRemoveConfirmationOpen}>
      <DialogContent
        className="sm:max-w-sm"
        onInteractOutside={(e) => isSubmittingData && e.preventDefault()}>
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
              disabled={isSubmittingData}
              variant="secondary-outline">
              Cancel
            </DsButton>
          </DialogClose>
          <DsButton
            variant="destructive"
            loading={isSubmittingData}
            onClick={confirmRemove}>
            Remove
          </DsButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
