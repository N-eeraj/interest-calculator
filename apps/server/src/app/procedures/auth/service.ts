import bcrypt from "bcrypt";
import crypto from "crypto"
import { eq } from "drizzle-orm";

import { db } from "#db/index";
import {
  tokens,
  users,
} from "#db/schemas/index";
import { TRPCError } from "@trpc/server";

import {
  type RegistrationSchema,
  type AuthSuccessSchema,
  type LoginSchema,
} from "@app/schemas/auth";
import { type ProfileSchema } from "@app/schemas/profile";

export default class AuthService {
  static async register({ email, name, password }: RegistrationSchema): Promise<AuthSuccessSchema> {
    const existingUsers = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.email, email));

    if (existingUsers.length) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const [result] = await db.insert(users)
      .values({
        email,
        name,
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
      email,
      name,
      id: result.insertId,
      token,
      avatarUrl: null,
    };
  }

  static async login({ email, password }: LoginSchema): Promise<AuthSuccessSchema> {
    const [userFound] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        password: users.password,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .where(eq(users.email, email));

    if (!userFound) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid user credentials",
      });
    }

    const passwordCompare = await bcrypt.compare(password, userFound.password);
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
  }

  static async user(token: string): Promise<ProfileSchema> {
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
      .where(eq(tokens.token, token));

    if (!userFound) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token",
      });
    }

    return {
      ...userFound,
    };
  }
}
