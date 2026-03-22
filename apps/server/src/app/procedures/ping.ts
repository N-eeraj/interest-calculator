import { publicProcedure } from "#app/trpc";

const ping = publicProcedure
  .query(() => {
    return {
      success: true,
      message: "Reached tRPC Server",
      data: "pong"
    } as const;
  });

export default ping
