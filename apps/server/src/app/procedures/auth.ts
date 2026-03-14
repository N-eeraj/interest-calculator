import {
  registrationSchema,
} from "@app/schemas/auth";
import {
  profileSchema,
} from "@app/schemas/profile";

import {
  publicProcedure,
  protectedProcedure,
} from "#app/trpc";

const auth = {
  /**
   * Register a new user using the provided registration details.
  */
  register: publicProcedure
    .input(registrationSchema)
    .output(profileSchema)
    .query(async ({ input }) => {
      return {
        id: 1,
        name: "",
        email: "",
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
