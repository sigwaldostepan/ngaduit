import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.API_PORT,
  COOKIE_NAME: process.env.COOKIE_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_MAX_AGE: process.env.JWT_MAX_AGE,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
};
