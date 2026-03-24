import * as trpcExpress from "@trpc/server/adapters/express";
import {
  router,
  createContext,
} from "#app/trpc";
import pingProcedure from "#procedures/ping";
import authProcedures from "#procedures/auth/index";
import profileProcedures from "#procedures/profile/index";

const appRouter = router({
  /**
   * Public ping endpoint to check server connectivity.
   */
  ping: pingProcedure,

  /**
   * Auth related procedures.
   */
  auth: authProcedures,

  /**
   * Profile related procedures.
   */
  profile: profileProcedures,
});

const trpcAppRouter = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

export default trpcAppRouter;
export type AppRouter = typeof appRouter;
