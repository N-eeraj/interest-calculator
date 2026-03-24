import type { SubmitEvent } from "react";
import {
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import type { AnyFormApi } from "@tanstack/react-form";

import type { AuthSuccessSchema } from "@app/schemas/auth";

import handleFormError from "@utils/handleError";
import {
  setAccessToken,
  setRefreshToken,
} from "@utils/tokens";

export default function useAuth(form: AnyFormApi) {
  const loginSearchParams = useSearch({
    from: "/(guest)/login",
  });

  const navigate = useNavigate();

  const onError = (error: unknown) => {
    handleFormError(form, error);
  };

  const onSuccess = ({ accessToken, refreshToken }: AuthSuccessSchema) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    navigate({
      href: loginSearchParams.redirect ?? "/",
    });
  };

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  return {
    onSubmit,
    onError,
    onSuccess,
  };
}
