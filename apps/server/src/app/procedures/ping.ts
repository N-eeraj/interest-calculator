import { publicProcedure } from "#app/trpc";

const ping = publicProcedure
  .query(async () => {
    return { 
      success: true,
      message: "Reached tRPC Server",
      data: "pong"
    } as const;
  });

export default ping
