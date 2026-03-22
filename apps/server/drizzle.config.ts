import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "#server/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schemas/index.ts",
  dialect: "mysql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
