import bcrypt from "bcrypt";
import crypto from "crypto"
import { eq } from "drizzle-orm";

import {
  loginSchema,
  registrationSchema,
  authSuccessSchema,
} from "@app/schemas/auth";
import { profileSchema } from "@app/schemas/profile";

import {
  publicProcedure,
  protectedProcedure,
} from "#app/trpc";
import { db } from "#db/index";
import {
  tokens,
  users,
} from "#db/schema/index";
import { TRPCError } from "@trpc/server";

const auth = {
  /**
   * Register a new user using the provided registration details.
  */
  register: publicProcedure
    .input(registrationSchema)
    .output(authSuccessSchema)
    .mutation(async ({ input }) => {
      const existingUsers = await db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.email, input.email.toLowerCase()));

      if (existingUsers.length) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already taken",
        });
      }

      const hashedPassword = await bcrypt.hash(input.password, 12);
      const [result] = await db.insert(users)
        .values({
          ...input,
          avatarUrl: null,
          password: hashedPassword,
        });

      const token = crypto.randomBytes(32).toString("hex");
      await db.insert(tokens)
        .values({
          token,
          userId: result.insertId,
        });

      return {
        ...input,
        id: result.insertId,
        token,
        avatarUrl: null,
      };
    }),
  /**
   * Login a user using the provided credentials.
  */
  login: publicProcedure
    .input(loginSchema)
    .output(authSuccessSchema)
    .mutation(async ({ input }) => {
      const [userFound] = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          password: users.password,
          avatarUrl: users.avatarUrl,
        })
        .from(users)
        .where(eq(users.email, input.email.toLowerCase()));

      if (!userFound) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid user credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(input.password, userFound.password);
      if (!passwordCompare) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid user credentials",
        });
      }

      const token = crypto.randomBytes(32).toString("hex");
      await db.insert(tokens)
        .values({
          token,
          userId: userFound.id,
        });

      return {
        ...userFound,
        token
      };
    }),
  /**
   * Fetch details of current logged in user using the authentication token passed.
  */
  me: protectedProcedure
    .output(profileSchema)
    .query(async ({ ctx }) => {
      const [userFound] = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          password: users.password,
          avatarUrl: users.avatarUrl,
        })
        .from(users)
        .leftJoin(tokens, eq(users.id, tokens.userId))
        .where(eq(tokens.token, ctx.token));

      if (!userFound) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid token",
        });
      }

      return {
        ...userFound,
      };
    }),
};

export default auth;
