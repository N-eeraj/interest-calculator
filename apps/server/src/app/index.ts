import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

const createContext = ({}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  ping: t.procedure
    .query(async () => {
      return { 
        success: true,
        message: "Reached tRPC Server",
        data: "pong"
      } as const;
    }),
});

const trpcAppRouter = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

export default trpcAppRouter;
export type AppRouter = typeof appRouter;
