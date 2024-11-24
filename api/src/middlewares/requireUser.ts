import { NextFunction, Request, Response } from "express";
import { env } from "../env";
import { ErrorResponse, sendErrorResponse } from "../utils/responses";
import { verifyJWT } from "../utils/jwt";
import { JsonWebTokenError } from "jsonwebtoken";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[env.COOKIE_NAME!];
  if (!token) {
    const error = new ErrorResponse("-1 token ngabs", 401);
    sendErrorResponse({ res, error });
    return;
  }

  try {
    const decoded = verifyJWT(token);
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      const error = new ErrorResponse("Token nggak valid", 401);
      sendErrorResponse({ res, error });
    }

    sendErrorResponse({ res, error });
  }
};
