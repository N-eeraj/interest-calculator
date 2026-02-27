import express from "express";

import corsMiddleware from "#src/middlewares/cors";
import trpcAppRouter from "#src/app/index";
import {
  PORT,
} from "#server/config";

const app = express();
app.use(corsMiddleware);

app.use("/trpc", trpcAppRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
