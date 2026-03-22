import {
  initTRPC,
  TRPCError,
} from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";
import z, { ZodError } from "zod";

import { profileSchema } from "@app/schemas/profile";
import { JWT_SECRET } from "#server/config";

export const createContext = async ({ req }: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    type ErrorResponse = typeof shape & Partial<ReturnType<typeof z.flattenError>>;
    const errorResponse: ErrorResponse = {
      ...shape,
    };
    if (error.cause instanceof ZodError) {
      const zodErrors = z.flattenError(error.cause);
      errorResponse.formErrors = zodErrors.formErrors;
      errorResponse.fieldErrors = zodErrors.fieldErrors;
    }
    return errorResponse;
  },
});

const authMiddleware = t.middleware(({ ctx, next }) => {
  const accessToken = ctx.req.headers.authorization?.replace("Bearer ", "");

  // handle missing token
  if (!accessToken) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing access token",
    })
  }

  // validate/decode token and get user data
  const jwtPayload = jwt.verify(accessToken, JWT_SECRET);
  const { data: user } = profileSchema.safeParse(jwtPayload);
  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid token",
    });
  }

  return next({
    ctx: {
      ...ctx,
      accessToken,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(authMiddleware);
