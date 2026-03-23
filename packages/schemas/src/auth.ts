import * as z from "zod";
import { AUTH } from "#messages";
import { profileSchema } from "#schemas/profile";

export const registrationSchema = z.object({
  name: z.string({ error: AUTH.register.name.required })
    .trim()
    .nonempty(AUTH.register.name.required),
  email: z.email({ error: AUTH.register.email.required })
    .trim()
    .toLowerCase(),
  password: z.string({ error: AUTH.register.password.required })
    .nonempty(AUTH.register.password.required)
    .min(6, AUTH.register.password.minLength)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { error: (issue) => {
      if (issue.input) {
        if (!/[a-z]/.test(issue.input)) return AUTH.register.password.lowercaseRequired
        if (!/[A-Z]/.test(issue.input)) return AUTH.register.password.uppercaseRequired
        if (!/\d/.test(issue.input)) return AUTH.register.password.numberRequired
      }
      return AUTH.register.password.format
    }}),
});
export type RegistrationSchema = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z.email({ error: AUTH.login.email.required })
    .trim(),
    password: z.string({ error: AUTH.login.password.required })
      .nonempty(AUTH.login.password.required)
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const tokensSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});
export type TokensSchema = z.infer<typeof tokensSchema>;

export const authSuccessSchema = profileSchema.extend(tokensSchema.shape);
export type AuthSuccessSchema = z.infer<typeof authSuccessSchema>;

const refreshTokenSchema = tokensSchema.pick({
  refreshToken: true,
});

export const logoutSchema = refreshTokenSchema;
export type LogoutSchema = z.infer<typeof logoutSchema>;

export const refreshSchemaInput = refreshTokenSchema;
export const refreshSchemaOutput = tokensSchema.pick({
  accessToken: true,
});
export type RefreshSchemaInput = z.infer<typeof refreshSchemaInput>;
export type RefreshSchemaOutput = z.infer<typeof refreshSchemaOutput>;
