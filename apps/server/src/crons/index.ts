import cleanupExpiredTokens from "#crons/cleanupExpiredTokens";

export default function startCronTasks() {
  cleanupExpiredTokens();
}
