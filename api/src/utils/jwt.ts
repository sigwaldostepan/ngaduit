import * as jwt from "jsonwebtoken";
import { env } from "../env";
import { DecodedJwt } from "../types";

type Payload = {
  id: string;
  email: string;
  name: string;
};

export const signJWT = (payload: Payload) => {
  return jwt.sign({ ...payload }, env.JWT_SECRET!, {
    expiresIn: env.JWT_MAX_AGE,
  });
};

export const verifyJWT = (token: string): DecodedJwt => {
  return jwt.verify(token, env.JWT_SECRET!) as DecodedJwt;
};
