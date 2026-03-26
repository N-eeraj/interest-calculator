import { TRPCError } from "@trpc/server";
import { fileTypeFromBuffer } from "file-type";
import { octetInputParser } from "@trpc/server/http";

import {
  profileUpdateSchema,
  passwordUpdateSchema,
  profilePictureSchema,
} from "@app/schemas/profile";

import { protectedProcedure } from "#app/trpc";
import ProfileService from "#procedures/profile/service";

const profile = {
  /**
   * Updates logged in user's name and email.
   */
  update: protectedProcedure
    .input(profileUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      await ProfileService.update(ctx.user.id, input);
    }),

  /**
   * Updates logged in user's password.
   */
  passwordUpdate: protectedProcedure
    .input(passwordUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      await ProfileService.passwordUpdate(ctx.user.id, input);
    }),

  /**
   * Profile picture.
   */
  avatar: {
    /**
     * Update profile picture.
     */
    update: protectedProcedure
      .input(octetInputParser)
      .mutation(async ({ ctx, input }) => {
        const chunks: Uint8Array[] = [];
        for await (const chunk of input) chunks.push(chunk);

        const buffer = Buffer.concat(chunks);

        // Detect MIME type and extension from buffer
        const type = await fileTypeFromBuffer(buffer);
        const mimeType = type?.mime || "application/octet-stream";
        const ext = type?.ext || "bin";
    
        // Create a File with the original MIME type
        const file = new File([buffer], `uploaded-file.${ext}`, { type: mimeType });

        const {
          data,
          error,
        } = profilePictureSchema.safeParse(file);

        if (error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            cause: error,
            message: "Failed to update profile picture",
          });
        }

        if (data) {
          await ProfileService.pictureUpdate(ctx.user.id, data);
        }
      }),

    /**
     * Delete profile picture.
     */
    delete: protectedProcedure
      .mutation(async ({ ctx }) => {
        await ProfileService.pictureDelete(ctx.user.id);
      }),
  },
};

export default profile;
