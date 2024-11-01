import express from "express";
import { env } from "./env";
import { logger } from "./middlewares/logger";
import { connectDB } from "./lib/db";

const app = express();

const port = env.PORT;

app.use(express.json());
app.use(logger);

app.listen(port, () => {
  console.log("Server running on port: " + port);
  connectDB();
});
