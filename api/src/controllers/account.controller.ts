import { Request, Response } from "express";
import { AccountService } from "../services/account.service";
import { sendErrorResponse, sendOkResponse } from "../utils/responses";

export class AccountController {
  constructor(private accountService: AccountService) {
    this.accountService = accountService;
  }

  getAccounts = async (req: Request, res: Response) => {
    try {
      const sortBy = req.query.sortBy as string;
      const order = req.query.order as string;
      const search = req.query.search as string;
      const userId = req.user?.id as string;

      const accounts = await this.accountService.getAccounts(userId, sortBy, order, search);

      sendOkResponse({ res, payload: { data: accounts }, status: 200 });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  getAccountById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const userId = req.user?.id as string;

      const account = await this.accountService.getAccountById(id, userId);

      sendOkResponse({ res, payload: { data: account }, status: 200 });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  addAccount = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const { name, balance } = req.body;

      const account = await this.accountService.addAccount(userId, name, balance);

      sendOkResponse({
        res,
        payload: {
          message: "Akun rekening berhasil ditambahkan",
          data: account,
        },
        status: 201,
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  topUp = async (req: Request, res: Response) => {
    try {
      const amount = req.body;
      const accountId = req.params.id;
      const userId = req.user?.id as string;

      await this.accountService.topUp(accountId, userId, amount);

      sendOkResponse({ res, payload: { message: "Top up berhasil coyy" }, status: 200 });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  editAccount = async (req: Request, res: Response) => {
    try {
      const accountId = req.params.id;
      const userId = req.user?.id as string;
      const payload = req.body;

      await this.accountService.editAccount(accountId, userId, payload);

      sendOkResponse({
        res,
        payload: { message: "Data akun rekening berhasil di-adpet" },
        status: 200,
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  deleteAccount = async (req: Request, res: Response) => {
    try {
      const accountId = req.params.id;
      const userId = req.user?.id as string;

      await this.accountService.deleteAccount(accountId, userId);

      sendOkResponse({
        res,
        payload: { message: "Akun rekening berhasil dihapus y wak" },
        status: 200,
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };
}
