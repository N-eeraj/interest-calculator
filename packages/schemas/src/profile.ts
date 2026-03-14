import * as z from "zod";

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  avatar_url: z.string()
    .nullable(),
});
