import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = async ({ req }: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const authMiddleware = t.middleware(({ ctx, next }) => {
  const token = ctx.req.headers.authorization?.replace("Bearer ", "");

  // handle missing token
  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing authentication token",
    })
  }

  // validate token and fetch user
  const user = {};

  return next({
    ctx: {
      ...ctx,
      token,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(authMiddleware);
