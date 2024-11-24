import express from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

interface DecodedJwt extends JwtPayload {
  id: string;
  email: string;
  name: string;
}
