import { NextFunction, Request, Response } from "express";
import { ErrorResponse, sendErrorResponse } from "../utils/responses";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const { error: parseError } = schema.safeParse(body);

  if (parseError) {
    const error = new ErrorResponse(parseError.errors, 403);
    sendErrorResponse({ res, error });
    return;
  }

  next();
};
