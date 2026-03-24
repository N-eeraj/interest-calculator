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
export type ProfileSchema = z.infer<typeof profileSchema>;

export const profileUpdateSchema = profileSchema
  .pick({
    name: true,
    email: true,
  })
export type ProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;
