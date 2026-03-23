import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";

import ThemeProvider from "@components/theme/Provider";
import { routeTree } from "./routeTree.gen";
import TRPCQueryProvider, {
  queryClient,
  trpc,
} from "@/TRPCQueryProvider";
import "@assets/tailwind.css";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    trpc,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TRPCQueryProvider>
        <ThemeProvider
          defaultTheme="system"
          storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </TRPCQueryProvider>
    </StrictMode>,
  );
}
