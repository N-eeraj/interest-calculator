import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  createTRPCClient,
  httpBatchLink,
} from "@trpc/client";
import {
  useState,
  type PropsWithChildren,
} from "react";
import { TRPCProvider } from "@/utils/trpc";
import {
  type AppRouter,
} from "@/index";

// create a new [tanstack] query client
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

export default function TRPCQueryProvider({ children }: PropsWithChildren) {
  const queryClient = makeQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_TRPC_URL,
        }),
      ],
    }),
  );

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
