import { db } from '../lib/db';

export class AccountRepository {
  getAllAccounts = async (userId: string) => {
    const accounts = await db.account.findMany({
      where: { userId },
    });

    return accounts;
  };

  getSortedAllAccounts = async (
    userId: string,
    sortBy: string,
    order: string
  ) => {
    const accounts = await db.account.findMany({
      where: { userId },
      orderBy: {
        [sortBy]: order,
      },
    });

    return accounts;
  };

  getAccountById = async (accountId: string, userId: string) => {
    const account = await db.account.findUnique({
      where: { id: accountId, userId },
    });

    return account;
  };

  getAccountsByName = async (accountName: string, userId: string) => {
    const accounts = await db.account.findMany({
      where: {
        name: { contains: accountName, mode: 'insensitive' },
        userId,
      },
    });

    return accounts;
  };

  getSortedAccountsByName = async (
    accountName: string,
    sortBy: string,
    order: string,
    userId: string
  ) => {
    const accounts = await db.account.findMany({
      where: { name: { contains: accountName, mode: 'insensitive' }, userId },
      orderBy: {
        [sortBy]: order,
      },
    });

    return accounts;
  };

  getTotalBalance = async (userId: string) => {
    const totalBalance = await db.account.aggregate({
      where: {
        userId,
      },
      _sum: {
        balance: true,
      },
    });

    return totalBalance._sum;
  };

  createAccount = async (
    userId: string,
    accountName: string,
    initialBalance: number
  ) => {
    const account = await db.account.create({
      data: {
        userId,
        name: accountName,
        balance: initialBalance,
      },
    });

    return account;
  };

  updateAccount = async (
    accountId: string,
    accountName: string,
    balance: number
  ) => {
    const updatedAccount = await db.account.update({
      where: { id: accountId },
      data: { name: accountName, balance },
    });

    return updatedAccount;
  };

  updateBalance = async (accountId: string, amount: number) => {
    return await db.account.update({
      where: { id: accountId },
      data: { balance: amount },
    });
  };

  deleteAccount = async (accountId: string, userId: string) => {
    return await db.account.delete({
      where: { id: accountId, userId },
    });
  };
}
