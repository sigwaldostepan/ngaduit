import { TransactionRepository } from '../repositories/transaction.repository';
import {
  CreateTransactionSchema,
  EditTransactionSchema,
} from '../schemas/transaction';
import { ErrorResponse } from '../utils/responses';
import { AccountService } from './account.service';

export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private accountService: AccountService
  ) {
    this.transactionRepository = transactionRepository;
    this.accountService = accountService;
  }

  getTransactions = async (userId: string) => {
    const transactions = await this.transactionRepository.getAllTransactions(
      userId
    );

    return transactions;
  };

  getTransactionById = async (transactionId: string, userId: string) => {
    const transaction = await this.transactionRepository.getTransactionById(
      transactionId,
      userId
    );

    if (!transaction) {
      throw new ErrorResponse('Transaksi gak ketemu', 404);
    }

    return transaction;
  };

  getTransactionsByDescription = async (
    description: string,
    userId: string
  ) => {
    const transactions =
      await this.transactionRepository.getTransactionByDescription(
        description,
        userId
      );

    return transactions;
  };

  getIncomeTransactions = async (userId: string) => {
    const transactions = await this.transactionRepository.getIncomeTransactions(
      userId
    );

    return transactions;
  };

  getExpenseTransactions = async (userId: string) => {
    const transactions =
      await this.transactionRepository.getExpenseTransactions(userId);

    return transactions;
  };

  getRecentAndCountTransactions = async (userId: string) => {
    const transactions = await this.transactionRepository.getRecentTransactions(
      userId
    );
    const count = await this.transactionRepository.countTransaction(userId);

    return {
      transactions,
      count,
    };
  };

  createIncomeTransaction = async (
    payload: CreateTransactionSchema,
    userId: string
  ) => {
    const account = await this.accountService.getAccountById(
      payload.accountId,
      userId
    );

    const transaction = await this.transactionRepository.createTransaction(
      payload,
      'INCOME',
      userId
    );

    await this.accountService.increaseBalance(
      account.id,
      userId,
      +transaction.amount
    );

    return transaction;
  };

  createExpenseTransaction = async (
    payload: CreateTransactionSchema,
    userId: string
  ) => {
    const account = await this.accountService.getAccountById(
      payload.accountId,
      userId
    );

    if (+account.balance < payload.amount) {
      throw new ErrorResponse('Saldo lu ga cukup, kere', 400);
    }

    const transaction = await this.transactionRepository.createTransaction(
      payload,
      'EXPENSE',
      userId
    );

    await this.accountService.decreaseBalance(
      account.id,
      userId,
      +transaction.amount
    );

    return transaction;
  };

  editTransaction = async (
    transactionId: string,
    payload: EditTransactionSchema,
    userId: string,
    transactionType?: 'INCOME' | 'EXPENSE'
  ) => {
    const transaction = await this.getTransactionById(transactionId, userId);

    return await this.transactionRepository.editTransaction(
      payload,
      transaction.id,
      userId,
      transactionType
    );
  };

  deleteTransaction = async (transactionId: string, userId: string) => {
    const transaction = await this.getTransactionById(transactionId, userId);

    if (transaction.transactionType === 'EXPENSE') {
      await this.accountService.increaseBalance(
        transaction.accountId,
        userId,
        +transaction.amount
      );
    } else if (transaction.transactionType === 'INCOME') {
      await this.accountService.decreaseBalance(
        transaction.accountId,
        userId,
        +transaction.amount
      );
    } else {
      throw new ErrorResponse('Jenis transaksi gak valid', 500);
    }

    return await this.transactionRepository.deleteTransaction(
      transactionId,
      userId
    );
  };
}
