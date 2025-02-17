import express, { Request, Response } from 'express';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionService } from '../services/transaction.service';
import { TransactionController } from '../controllers/transaction.controller';
import { requireUser } from '../middlewares/requireUser';
import { validateBody } from '../middlewares/validation';
import {
  createTransactionSchema,
  editTransactionSchema,
} from '../schemas/transaction';
import { AccountService } from '../services/account.service';
import { AccountRepository } from '../repositories/account.repository';

const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(
  transactionRepository,
  accountService
);
const transactionController = new TransactionController(transactionService);

const router = express.Router();

router.get('/transactions', requireUser, transactionController.getTransactions);
router.get(
  '/transaction/:id',
  requireUser,
  transactionController.getTransactionById
);
router.post(
  '/transactions',
  requireUser,
  validateBody(createTransactionSchema),
  transactionController.createTransaction
);
router.put(
  '/transaction/:id',
  requireUser,
  validateBody(editTransactionSchema),
  transactionController.editTransaction
);
router.delete(
  '/transaction/:id',
  requireUser,
  transactionController.deleteTransaction
);

export default router;
