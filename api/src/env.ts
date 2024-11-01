import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.API_PORT,
};
