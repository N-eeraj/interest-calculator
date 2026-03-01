import z from "zod";
import { protectedProcedure } from "#app/trpc";

const auth = {
  /**
   * Fetch details of current logged in user using the authentication token passed.
  */
  me: protectedProcedure
    .output(z.object({ success: z.boolean(), message: z.string() }))
    .query(async () => {
      return {
        success: true,
        message: "123",
      };
    }),
};

export default auth;
