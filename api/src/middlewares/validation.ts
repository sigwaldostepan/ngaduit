import { NextFunction, Request, Response } from "express";
import { loginBodySchema, registerBodySchema } from "../schemas/auth";
import { ErrorResponse, sendErrorResponse } from "../utils/responses";

export const validateRegisterBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const { error: parseError } = registerBodySchema.safeParse(body);

  if (parseError) {
    const error = new ErrorResponse(parseError.errors, 403);
    sendErrorResponse({ res, error });
    return;
  }

  next();
};

export const validateLoginBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const { error: parseError } = loginBodySchema.safeParse(body);

  if (parseError) {
    const error = new ErrorResponse(parseError.errors, 403);
    sendErrorResponse({ res, error });
    return;
  }

  next();
};
