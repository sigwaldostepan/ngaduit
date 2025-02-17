export type ApiResponse = {
  message: string;
  statusCode: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  accounts?: Account;
  transactions?: Transaction;
};

export type Account = {
  id: string;
  name: string;
  balance: number;
  userId: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  userId: string;
  transactions: Transaction[];
};

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  transactionType: TransactionType;
  userId: string;
  accountId: string;
  account: Account;
  categoryId?: string;
  category?: Category;
};
