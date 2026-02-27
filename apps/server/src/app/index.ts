import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({}: trpcExpress.CreateExpressContextOptions) => ({});
export type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  ping: t.procedure
    .query(() => {
      return { 
        success: true,
        message: "Reached tRPC Server",
        data: "pong"
      };
    }),
});

export type AppRouter = typeof appRouter;
