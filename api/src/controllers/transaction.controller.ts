import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import {
  ErrorResponse,
  sendErrorResponse,
  sendOkResponse,
} from '../utils/responses';

export class TransactionController {
  constructor(private transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  getTransactions = async (req: Request, res: Response) => {
    try {
      if (req.query.desc) {
        return this.getTransactionsByDescription(req, res);
      }

      const userId = req.user?.id as string;

      const transactions = await this.transactionService.getTransactions(
        userId
      );

      sendOkResponse({ res, payload: { data: transactions } });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  getTransactionById = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const transactionId = req.params.id;

      const transaction = await this.transactionService.getTransactionById(
        transactionId,
        userId
      );

      sendOkResponse({ res, payload: { data: transaction } });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  getTransactionsByDescription = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const description = req.query.desc as string;

      const transactions =
        await this.transactionService.getTransactionsByDescription(
          description,
          userId
        );

      sendOkResponse({ res, payload: { data: transactions } });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  getIncomeTransactions = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;

      const transactions = await this.transactionService.getIncomeTransactions(
        userId
      );

      sendOkResponse({ res, payload: { data: transactions } });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  getExpenseTransactions = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;

      const transactions = await this.transactionService.getExpenseTransactions(
        userId
      );

      sendOkResponse({ res, payload: { data: transactions } });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  createTransaction = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const payload = req.body;

      let transaction;

      if (payload.transactionType === 'INCOME') {
        transaction = await this.transactionService.createIncomeTransaction(
          payload,
          userId
        );
      } else if (payload.transactionType === 'EXPENSE') {
        transaction = await this.transactionService.createExpenseTransaction(
          payload,
          userId
        );
      } else {
        throw new ErrorResponse('Jenis transaksi gak valid nih', 500);
      }

      sendOkResponse({
        res,
        payload: { message: 'Transaksi berhasil dibuat', data: transaction },
        status: 201,
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  editTransaction = async (req: Request, res: Response) => {
    try {
      const transactionId = req.params.id;
      const userId = req.user?.id as string;
      const payload = req.body;

      const transaction = await this.transactionService.editTransaction(
        transactionId,
        payload,
        userId
      );

      sendOkResponse({
        res,
        payload: { message: 'Transaksi berhasil dibuat', data: transaction },
        status: 201,
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  deleteTransaction = async (req: Request, res: Response) => {
    try {
      const transactionId = req.params.id;
      const userId = req.user?.id as string;

      await this.transactionService.deleteTransaction(transactionId, userId);

      sendOkResponse({
        res,
        payload: { message: 'Transaksi berhasil dihapus' },
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };
}
