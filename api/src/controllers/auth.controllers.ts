import { Request, Response } from "express";
import {
  attachCookie,
  clearCookie,
  ErrorResponse,
  sendErrorResponse,
  sendOkResponse,
} from "../utils/responses";
import { signJWT } from "../utils/jwt";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private AuthService: AuthService) {
    this.AuthService = AuthService;
  }

  register = async (req: Request, res: Response) => {
    try {
      const payload = req.body;

      const user = await this.AuthService.register(payload);

      sendOkResponse({
        res,
        payload: { message: "Register berhasil", data: user },
        status: 201,
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const payload = req.body;

      const data = await this.AuthService.login(payload);

      const token = signJWT({
        id: data.id as string,
        email: data.email as string,
        name: data.name as string,
      });

      attachCookie(res, token);
      sendOkResponse({
        res,
        payload: { message: "Login berhasil", data },
        status: 200,
      });
    } catch (error) {
      console.log(error);
      sendErrorResponse({ res, error });
    }
  };

  logout = (req: Request, res: Response) => {
    try {
      req.user = undefined;
      clearCookie(res);

      sendOkResponse({
        res,
        payload: { message: "Logout berhasil" },
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  checkSession = (req: Request, res: Response) => {
    try {
      if (req.user) {
        sendOkResponse({
          res,
          payload: { message: "Session valid", data: req.user },
        });
        return;
      } else {
        throw new ErrorResponse("Session tydack valid", 403);
      }
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };
}
