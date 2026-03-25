import {
  createContext,
  useState,
  type PropsWithChildren,
} from "react";

interface ProfilePictureContext {
  isRemoving: boolean;
  isRemoveConfirmationOpen: boolean;
  setIsRemoving: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRemoveConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfilePictureContext = createContext<ProfilePictureContext>({
  isRemoving: false,
  isRemoveConfirmationOpen: false,
  setIsRemoving: () => {},
  setIsRemoveConfirmationOpen: () => {},
});

export default function ProfilePictureContextProvider({ children }: PropsWithChildren) {
  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const values = {
    isRemoving,
    isRemoveConfirmationOpen,
    setIsRemoving,
    setIsRemoveConfirmationOpen,
  };

  return (
    <ProfilePictureContext value={values}>
      {children}
    </ProfilePictureContext>
  );
}
