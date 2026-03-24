import { profileUpdateSchema } from "@app/schemas/profile";
import { protectedProcedure } from "#app/trpc";
import ProfileService from "#procedures/profile/service";

const profile = {
  /**
   * Updates logged in user's name and email.
   */
  update: protectedProcedure
    .input(profileUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        name,
        email,
      } = ctx.user;
      await ProfileService.update(id, input);
    }),
};

export default profile;
