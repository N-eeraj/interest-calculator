import express from "express";

import corsMiddleware from "#middlewares/cors";
import trpcAppRouter from "#app/router";
import {
  PORT,
  PUBLIC_PATH,
} from "#server/config";
import startCronTasks from "#crons/index";

const app = express();
app.use(corsMiddleware);

app.use(express.static(PUBLIC_PATH));
app.use("/trpc", trpcAppRouter);

startCronTasks();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
