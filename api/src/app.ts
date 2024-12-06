import express from "express";
import { env } from "./env";
import { logger } from "./middlewares/logger";
import { connectDB } from "./lib/db";
import authRoutes from "./routes/auth.routes";
import accountRoutes from "./routes/account.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const port = env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);

app.listen(port, () => {
  console.log("Server running on port: " + port);
  connectDB();
});
