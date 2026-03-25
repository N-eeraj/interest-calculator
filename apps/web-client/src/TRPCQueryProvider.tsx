import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  isNonJsonSerializable,
  splitLink,
} from "@trpc/client";
import {
  useState,
  type PropsWithChildren,
} from "react";
import {
  type AppRouter,
} from "@/index";
import { TRPCProvider } from "@utils/trpc";
import { getAccessToken } from "@utils/tokens";

// create a new [tanstack] query client
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}
export const queryClient = makeQueryClient();

function makeTRPCClient() {
  return createTRPCClient<AppRouter>({
    links: [
      splitLink({
        condition: (op) => isNonJsonSerializable(op.input),
        true: httpLink({
          url: import.meta.env.VITE_TRPC_URL,
          headers() {
            const accessToken = getAccessToken();
            return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
          },
        }),
        false: httpBatchLink({
          url: import.meta.env.VITE_TRPC_URL,
          headers() {
            const accessToken = getAccessToken();
            return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
          },
        }),
      }),
    ],
  })
}
export const trpc = makeTRPCClient();

export default function TRPCQueryProvider({ children }: PropsWithChildren) {
  const [trpcClient] = useState(() => trpc);

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider
        trpcClient={trpcClient}
        queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
