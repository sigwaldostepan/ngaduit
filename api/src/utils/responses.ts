import { type Response } from "express";
import { type ZodIssue } from "zod";
import { env } from "../env";

export class ErrorResponse extends Error {
  public status: number;
  public zodIssues?: ZodIssue[];

  constructor(message: string | ZodIssue[], status: number) {
    if (Array.isArray(message)) {
      super("Validation error");
      this.zodIssues = message;
    } else {
      super(message);
    }
    this.status = status;
  }
}

type SendErrorResponseParams = {
  res: Response;
  error: ErrorResponse | unknown;
};

export const sendErrorResponse = ({ res, error }: SendErrorResponseParams) => {
  if (error instanceof ErrorResponse) {
    if (error.zodIssues) {
      return res.status(error.status).send({
        success: false,
        message: error.message,
        status: error.status,
        error: error.zodIssues,
      });
    }
    return res.status(error.status).send({
      success: false,
      status: error.status,
      message: error.message,
    });
  } else if (error instanceof Error) {
    return res.status(500).send({
      success: false,
      status: 500,
      message: error.message || "Internal server error",
    });
  }
};

type SendOkResponseParams = {
  res: Response;
  payload: {
    message: string | ZodIssue[];
    data?: object;
  };
  status?: number;
};

export const sendOkResponse = ({
  res,
  payload,
  status = 200,
}: SendOkResponseParams) => {
  return res.status(status).send({
    status,
    success: true,
    ...payload,
  });
};

export const attachCookie = (res: Response, token: string) => {
  return res.cookie(env.COOKIE_NAME!, token, {
    secure: process.env.NODE_ENV == "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: Number(env.JWT_MAX_AGE!),
  });
};

export const clearCookie = (res: Response) => {
  return res.clearCookie(env.COOKIE_NAME!, {
    secure: process.env.NODE_ENV == "production",
    httpOnly: true,
    sameSite: "strict",
  });
};
