import { db } from '../lib/db';
import {
  CreateTransactionSchema,
  EditTransactionSchema,
} from '../schemas/transaction';

export class TransactionRepository {
  private selectOptions = {
    include: {
      category: true,
      account: true,
    },
  };

  getAllTransactions = async (userId: string) => {
    const transactions = await db.transaction.findMany({
      where: { userId },
      ...this.selectOptions,
    });

    return transactions;
  };

  getTransactionByDescription = async (description: string, userId: string) => {
    const transactions = await db.transaction.findMany({
      where: {
        description: {
          contains: description,
          mode: 'insensitive',
        },
        userId,
      },
      ...this.selectOptions,
    });

    return transactions;
  };

  getTransactionById = async (transactionId: string, userId: string) => {
    const transaction = await db.transaction.findUnique({
      where: {
        id: transactionId,
        userId,
      },
      ...this.selectOptions,
    });

    return transaction;
  };

  getRecentTransactions = async (userId: string) => {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
      take: 5,
    });

    return transactions;
  };

  countTransaction = async (userId: string) => {
    const count = await db.transaction.count({
      where: {
        userId,
      },
    });

    return count;
  };

  getIncomeTransactions = async (userId: string) => {
    const transactions = await db.transaction.findMany({
      where: { userId, transactionType: 'INCOME' },
      ...this.selectOptions,
    });

    return transactions;
  };

  getExpenseTransactions = async (userId: string) => {
    const transactions = await db.transaction.findMany({
      where: { userId, transactionType: 'EXPENSE' },
      ...this.selectOptions,
    });

    return transactions;
  };

  createTransaction = async (
    { accountId, amount, description, categoryId }: CreateTransactionSchema,
    transactionType: 'INCOME' | 'EXPENSE',
    userId: string
  ) => {
    return await db.transaction.create({
      data: {
        amount,
        description,
        transactionType,
        accountId,
        categoryId,
        userId,
      },
    });
  };

  editTransaction = async (
    { amount, description, accountId, categoryId }: EditTransactionSchema,
    transactionId: string,
    userId: string,
    transactionType?: 'INCOME' | 'EXPENSE'
  ) => {
    return await db.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        amount,
        description,
        transactionType,
        accountId,
        categoryId,
        userId,
      },
    });
  };

  deleteTransaction = async (transactionId: string, userId: string) => {
    return await db.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });
  };
}
