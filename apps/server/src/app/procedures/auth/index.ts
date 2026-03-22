import {
  loginSchema,
  registrationSchema,
  authSuccessSchema,
  refreshSchemaInput,
  refreshSchemaOutput,
} from "@app/schemas/auth";
import { profileSchema } from "@app/schemas/profile";

import {
  publicProcedure,
  protectedProcedure,
} from "#app/trpc";
import AuthService from "#procedures/auth/service";

const auth = {
  /**
   * Register a new user using the provided registration details.
  */
  register: publicProcedure
    .input(registrationSchema)
    .output(authSuccessSchema)
    .mutation(async ({ input }) => {
      const data = await AuthService.register(input);
      return data;
    }),

  /**
   * Login a user using the provided credentials.
  */
  login: publicProcedure
    .input(loginSchema)
    .output(authSuccessSchema)
    .mutation(async ({ input }) => {
      const data = await AuthService.login(input);
      return data;
    }),

  /**
   * Refresh access token using the refresh token passed.
  */
  refresh: publicProcedure
    .input(refreshSchemaInput)
    .output(refreshSchemaOutput)
    .query(({ input }) => {
      const data = AuthService.refresh(input);
      return data;
    }),

  /**
   * Return details of logged in user using the access token.
  */
  me: protectedProcedure
    .output(profileSchema)
    .query(async ({ ctx }) => {
      return ctx.user;
    }),
};

export default auth;
