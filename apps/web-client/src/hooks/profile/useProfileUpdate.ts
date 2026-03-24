import type { SubmitEvent } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  profileUpdateSchema,
  type ProfileUpdateSchema,
} from "@app/schemas/profile";

import {
  useAuthRefreshMutation,
  useAuthRefreshQuery,
} from "@hooks/useAuthRefreshQuery";
import { useTRPC } from "@utils/trpc";

export default function useProfileUpdate() {
  const trpc = useTRPC();
  const {
    data,
    isLoading,
    isRefetching
  } = useAuthRefreshQuery(trpc.auth.me.queryOptions());

  const form = useForm({
    defaultValues: {
      name: data?.name ?? "",
      email: data?.email ?? "",
    } satisfies ProfileUpdateSchema,
    validators: {
      onSubmit: profileUpdateSchema,
    },
    onSubmit: ({ value }) => mutation.mutate(value),
  });

  const mutation = useAuthRefreshMutation(trpc.profile.update.mutationOptions({
    onSuccess: () => {
      toast.success("Updated profile details");
    },
    onError: (error) => {
      console.log(error);
    },
  }));

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  return {
    isFetchingData: isLoading || isRefetching,
    form,
    onSubmit,
    isSubmitting: mutation.isPending || mutation.isRefreshingToken,
  };
}
