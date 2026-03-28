import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";

export default function DevTools() {
  return (
    <>
      <TanStackRouterDevtools position="top-right" />
      <ReactQueryDevtools
        buttonPosition="bottom-left" />
      <TanStackDevtools
        plugins={[
          formDevtoolsPlugin(),
        ]} />
    </>
  );
}