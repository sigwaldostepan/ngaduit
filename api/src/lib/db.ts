import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

export const connectDB = async () => {
  try {
    await db.$connect();

    console.log("Database connected");
  } catch (error) {
    console.error("Failed to connect to database");
    process.exit(0);
  }
};
