import cron from "node-cron";
import { db } from "#db/index";
import tokens from "#db/schemas/tokens";
import { lt } from "drizzle-orm";

export default function cleanupExpiredTokens() {
  const task = cron.schedule("0 0 * * *", async () => {
    try {
      await db
        .delete(tokens)
        .where(lt(tokens.expiresAt, new Date()));
      console.log("Expired token clean up completed");
    } catch (error) {
      console.error("Failed to cleanup expired tokens", error);
    }
  });

  return task;
}
