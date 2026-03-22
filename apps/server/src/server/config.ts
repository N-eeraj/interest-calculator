export const PORT: number = Number(process.env.PORT) ?? 4000;
export const ALLOWED_ORIGINS: Array<string> = process.env.ALLOWED_ORIGINS?.split(",") ?? [];

if (!process.env.DATABASE_URL) {
  throw Error("Missing env variable: \"DATABASE_URL\"");
}
export const DATABASE_URL: string = process.env.DATABASE_URL;

if (!process.env.JWT_SECRET) {
  throw Error("Missing env variable: \"JWT_SECRET\"");
}
export const JWT_SECRET: string = process.env.JWT_SECRET;
