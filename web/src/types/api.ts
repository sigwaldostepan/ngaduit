export type ApiResponse = {
  message: string;
  statusCode: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  accounts?: Accounts;
  transactions?: Transactions;
};

export type Accounts = {
  id: string;
  name: string;
  balance: number;
  userId: string;
};

export type Transactions = {
  id: string;
  amount: number;
  description: string;
  date: Date;
};
