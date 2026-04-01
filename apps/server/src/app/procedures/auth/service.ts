import bcrypt from "bcrypt";
import jwt, {
  type SignOptions,
} from "jsonwebtoken";
import crypto from "crypto";
import { eq, ExtractTablesWithRelations } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import type {
  RegistrationSchema,
  AuthSuccessSchema,
  LoginSchema,
  TokensSchema,
  RefreshSchemaInput,
  RefreshSchemaOutput,
  LogoutSchema,
} from "@app/schemas/auth";
import {
  profileIdSchema,
  type ProfileSchema,
} from "@app/schemas/profile";

import { db } from "#db/index";
import {
  tokens,
  users,
} from "#db/schemas/index";
import { JWT_SECRET } from "#server/config";
import { MySqlTransaction } from "drizzle-orm/mysql-core";
import { MySql2PreparedQueryHKT, MySql2QueryResultHKT } from "drizzle-orm/mysql2";

export default class AuthService {
  private static TOKEN_EXPIRY_TIME: number = 2_59_20_00_000; // 30 days in ms
  private static REFRESH_TOKEN_EXPIRES_IN: SignOptions["expiresIn"] = "30d";
  private static ACCESS_TOKEN_EXPIRES_IN: SignOptions["expiresIn"] = "15m";

  private static hashToken(token: string): string {
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    return hashedToken;
  }

  private static async authenticate(
    user: ProfileSchema,
    tx?: MySqlTransaction<
      MySql2QueryResultHKT,
      MySql2PreparedQueryHKT,
      Record<string, never>,
      ExtractTablesWithRelations<Record<string, never>>
    >,
  ): Promise<TokensSchema> {
    const payload = {
      id: user.id,
    };

    const refreshToken = jwt.sign(
      {
        ...payload,
        jti: crypto.randomUUID()
      },
      JWT_SECRET,
      {
        expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
      }
    );
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
    });
  
    const hashedToken = this.hashToken(refreshToken);
    await (tx ?? db)
      .insert(tokens)
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

    const data = await db
      .transaction(async (tx) => {
        const [result] = await tx
          .insert(users)
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
        } = await this.authenticate(user, tx);
        return {
          ...user,
          accessToken,
          refreshToken,
        };
      })

    return data;
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

  static async logout({ refreshToken }: LogoutSchema): Promise<void> {
    const hashedToken = this.hashToken(refreshToken);

    const [result] = await db
      .delete(tokens)
      .where(eq(tokens.token, hashedToken));

    if (!result.affectedRows) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid token",
      });
    }
  }

  static async refresh({ refreshToken }: RefreshSchemaInput): Promise<RefreshSchemaOutput> {
    const hashedToken = this.hashToken(refreshToken);

    const [tokenFound] = await db
      .select({
        token: tokens.token,
      })
      .from(tokens)
      .where(eq(tokens.token, hashedToken))
      .limit(1);

    if (!tokenFound) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token",
      });
    }

    const jwtPayload = jwt.verify(refreshToken, JWT_SECRET);
    const { data } = profileIdSchema.safeParse(jwtPayload);
    if (!data) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token",
      });
    }

    const accessToken = jwt.sign(
      {
        id: data.id,
      },
      JWT_SECRET,
      {
        expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
      }
    );

    return {
      accessToken,
    };
  }
}
