import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import type {
  RegistrationSchema,
  AuthSuccessSchema,
  LoginSchema,
  TokensSchema,
} from "@app/schemas/auth";
import type { ProfileSchema } from "@app/schemas/profile";

import { db } from "#db/index";
import {
  tokens,
  users,
} from "#db/schemas/index";
import { JWT_SECRET } from "#server/config";

export default class AuthService {
  private static TOKEN_EXPIRY_TIME = 2_59_20_00_000; // 30 days in ms

  private static async authenticate(user: ProfileSchema): Promise<TokensSchema> {
    const refreshToken = jwt.sign(user, JWT_SECRET, {
      expiresIn: "30d",
    });
    const accessToken = jwt.sign(user, JWT_SECRET, {
      expiresIn: "15m",
    });
  
    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    await db.insert(tokens)
      .values({
        token: hashedToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + this.TOKEN_EXPIRY_TIME),
      });

    return {
      refreshToken,
      accessToken,
    };
  }

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
    const user = {
      email,
      name,
      id: result.insertId,
      avatarUrl: null,
    };

    const {
      accessToken,
      refreshToken,
    } = await this.authenticate(user);

    return {
      ...user,
      accessToken,
      refreshToken,
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

    const {
      accessToken,
      refreshToken,
    } = await this.authenticate(userFound);

    return {
      ...userFound,
      accessToken,
      refreshToken,
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
