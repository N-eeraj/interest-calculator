import * as trpcExpress from "@trpc/server/adapters/express";
import pingProcedure from "#procedures/ping";
import authProcedures from "#procedures/auth";
import {
  router,
  createContext,
} from "#app/trpc";

const appRouter = router({
/**
 * Public ping endpoint to check server connectivity.
 */
  ping: pingProcedure,

  /**
   * Auth related procedures.
  */
  auth: authProcedures,
});

const trpcAppRouter = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

export default trpcAppRouter;
export type AppRouter = typeof appRouter;
