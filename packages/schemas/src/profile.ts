import * as z from "zod";

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string()
    .nullable(),
});
export type ProfileSchema = z.infer<typeof profileSchema>;
