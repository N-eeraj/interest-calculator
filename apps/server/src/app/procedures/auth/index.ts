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
import AuthService from "#procedures/auth/service";

const auth = {
  /**
   * Register a new user using the provided registration details.
  */
  register: publicProcedure
    .input(registrationSchema)
    .output(authSuccessSchema)
    .mutation(async ({ input }) => {
      const response = await AuthService.register(input);
      return response;
    }),

  /**
   * Login a user using the provided credentials.
  */
  login: publicProcedure
    .input(loginSchema)
    .output(authSuccessSchema)
    .mutation(async ({ input }) => {
      const response = await AuthService.login(input);
      return response;
    }),

  /**
   * Fetch details of current logged in user using the authentication token passed.
  */
  me: protectedProcedure
    .output(profileSchema)
    .query(async ({ ctx }) => {
      const response = AuthService.user(ctx.token);
      return response;
    }),
};

export default auth;
