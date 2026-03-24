import {
  useEffect,
  useState,
} from "react";
import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseQueryResult,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";

import {
  queryClient,
  trpc,
} from "@/TRPCQueryProvider";
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "@utils/tokens";

export function clearTokensAndLogout() {
  removeAccessToken();
  removeRefreshToken();

  throw redirect({
    to: "/login",
    search: { redirect: location.href },
  });
}

export async function refreshAccessToken() {
  try {
    const refreshToken = getRefreshToken();
    const {
      accessToken
    } = await queryClient.fetchQuery({
      queryKey: ["auth.refresh"],
      queryFn: () => trpc.auth.refresh.query({ refreshToken }),
      staleTime: 0,
    });
    setAccessToken(accessToken);
  } catch {
    clearTokensAndLogout();
  }
}

interface TokenRefreshLoading {
  isRefreshingToken: boolean;
}
interface QueryRefreshLoading extends TokenRefreshLoading {
  isFetchingData: boolean;
}
interface MutationRefreshLoading extends TokenRefreshLoading {
  isSubmittingData: boolean;
}

export function useAuthRefreshQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[]
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> & QueryRefreshLoading {
  const query = useQuery<TQueryFnData, TError, TData, TQueryKey>(options);
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);

  useEffect(() => {
    if (!query.error) return;

    if (
      typeof query.error === "object" &&
      query.error !== null &&
      "data" in query.error &&
      query.error.data &&
      typeof query.error.data === "object" &&
      "code" in query.error.data &&
      (query.error.data as any).code === "UNAUTHORIZED"
    ) {
      setIsRefreshingToken(true);
      refreshAccessToken()
        .then(async () => {
          await query.refetch();
          setIsRefreshingToken(false);
        });
    }
  }, [query.error]);

  return {
    ...query,
    isRefreshingToken,
    isFetchingData: query.isPending || query.isLoading || isRefreshingToken,
  };
}

export function useAuthRefreshMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> & MutationRefreshLoading {
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    ...options,
    onError: async (error, variables, context, mutationInstance) => {
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        error.data &&
        typeof error.data === 'object' &&
        'code' in error.data &&
        (error.data as any).code === 'UNAUTHORIZED'
      ) {
        setIsRefreshingToken(true);
        try {
          await refreshAccessToken();
          mutation.mutate(variables);
        } catch (error: unknown) {
          options?.onError?.(error as TError, variables, context, mutationInstance);
        } finally {
          setIsRefreshingToken(false);
        }
      } else {
        options?.onError?.(error, variables, context, mutationInstance);
      }
    },
  });

  return {
    ...mutation,
    isRefreshingToken,
    isSubmittingData: mutation.isPending || isRefreshingToken,
  };
}
