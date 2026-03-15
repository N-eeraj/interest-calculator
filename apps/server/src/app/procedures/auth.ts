import bcrypt from "bcrypt";
import crypto from "crypto"
import { eq } from "drizzle-orm";

import {
  registrationSchema,
} from "@app/schemas/auth";
import {
  authSuccessSchema,
} from "@app/schemas/auth";

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
      const existingUser = await db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.email, input.email.toLowerCase()));

      if (existingUser.length) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already taken",
        });
      }

      const hashedPassword = await bcrypt.hash(input.password, 12)
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
        avatar_url: null,
      };
    }),
  /**
   * Fetch details of current logged in user using the authentication token passed.
  */
  me: protectedProcedure
    .query(async () => {
      return ;
    }),
};

export default auth;
