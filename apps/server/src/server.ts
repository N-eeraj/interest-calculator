import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";

import {
  appRouter,
  createContext,
} from "#src/app/index"

const app = express();

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(4000);
