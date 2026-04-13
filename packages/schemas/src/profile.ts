import * as z from "zod";
import { PROFILE } from "#messages";

export const profileSchema = z.object({
  id: z.number(),
  name: z.string({ error: PROFILE.name.required })
    .nonempty({ error: PROFILE.name.required }),
  email: z.email({ error: PROFILE.email.valid })
    .nonempty({ error: PROFILE.email.required }),
  avatarUrl: z.string()
    .nullable(),
});
export type Profile = z.infer<typeof profileSchema>;

export const profileIdSchema = profileSchema.pick({ id: true });

export const profileUpdateSchema = profileSchema
  .pick({
    name: true,
    email: true,
  })
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;

export const passwordUpdateSchema = z.object({
  password: z.string({ error: PROFILE.updatePassword.password.required })
    .nonempty(PROFILE.updatePassword.password.required),
  newPassword: z.string({ error: PROFILE.updatePassword.newPassword.required })
    .nonempty(PROFILE.updatePassword.newPassword.required)
    .min(6, PROFILE.updatePassword.newPassword.minLength)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { error: (issue) => {
      if (issue.input) {
        if (!/[a-z]/.test(issue.input)) return PROFILE.updatePassword.newPassword.lowercaseRequired
        if (!/[A-Z]/.test(issue.input)) return PROFILE.updatePassword.newPassword.uppercaseRequired
        if (!/\d/.test(issue.input)) return PROFILE.updatePassword.newPassword.numberRequired
      }
      return PROFILE.updatePassword.newPassword.format
    }}),
});
export type PasswordUpdate = z.infer<typeof passwordUpdateSchema>;

export const profilePictureSchema = z.file({ error: PROFILE.picture.required })
  .max(1_048_576, { error: PROFILE.picture.maxSize })
  .mime([
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/heic",
    "image/gif",
  ], { error: PROFILE.picture.valid })
export type ProfilePicture = z.infer<typeof profilePictureSchema>;