import { AccountRepository } from '../repositories/account.repository';
import { EditAccountSchema, TopUpSchema } from '../schemas/account';
import { ErrorResponse } from '../utils/responses';

export class AccountService {
  constructor(private accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  private validSortFields = ['name', 'balance'];
  private validSortOrders = ['asc', 'desc'];

  getAccounts = async (
    userId: string,
    sortBy: string,
    order: string,
    searchQuery: string
  ) => {
    if (sortBy && !this.validSortFields.includes(sortBy)) {
      throw new ErrorResponse('Field pengurutan tidak valid', 400);
    } else if (order && !this.validSortOrders.includes(order)) {
      throw new ErrorResponse('Ga tau mau diurutin kaya gimana', 400);
    }

    let accounts;

    if (searchQuery && !(sortBy && order)) {
      accounts = await this.accountRepository.getAccountsByName(
        searchQuery,
        userId
      );
    } else if (searchQuery && sortBy && order) {
      accounts = await this.accountRepository.getSortedAccountsByName(
        searchQuery,
        sortBy,
        order,
        userId
      );
    } else if (!searchQuery && !(sortBy && order)) {
      accounts = await this.accountRepository.getAllAccounts(userId);
    } else if (!searchQuery && sortBy && order) {
      accounts = await this.accountRepository.getSortedAllAccounts(
        userId,
        sortBy,
        order
      );
    }

    return accounts;
  };

  getAccountById = async (id: string, userId: string) => {
    const account = await this.accountRepository.getAccountById(id, userId);

    if (!account) {
      throw new ErrorResponse('Akun rekening ga ketemu', 404);
    }

    return account;
  };

  addAccount = async (
    userId: string,
    accountName: string,
    initialBalance = 0
  ) => {
    const account = await this.accountRepository.createAccount(
      userId,
      accountName,
      initialBalance
    );

    return account;
  };

  topUp = async (accountId: string, userId: string, payload: TopUpSchema) => {
    const account = await this.getAccountById(accountId, userId);
    const newAccountBalance = +account.balance + payload.amount;

    const response = await this.accountRepository.updateBalance(
      account.id,
      newAccountBalance
    );

    return response;
  };

  increaseBalance = async (
    accountId: string,
    userId: string,
    amount: number
  ) => {
    const account = await this.getAccountById(accountId, userId);
    const newAccountBalance = +account.balance + amount;

    const response = await this.accountRepository.updateBalance(
      account.id,
      newAccountBalance
    );

    return response;
  };

  decreaseBalance = async (
    accountId: string,
    userId: string,
    amount: number
  ) => {
    const account = await this.getAccountById(accountId, userId);
    const newAccountBalance = +account.balance - amount;

    const response = await this.accountRepository.updateBalance(
      account.id,
      newAccountBalance
    );

    return response;
  };

  editAccount = async (
    accountId: string,
    userId: string,
    payload: EditAccountSchema
  ) => {
    const account = await this.getAccountById(accountId, userId);
    const newAccountBalance = payload.balance || +account.balance;

    const editedAccount = await this.accountRepository.updateAccount(
      account.id,
      payload.name,
      newAccountBalance
    );

    return editedAccount;
  };

  deleteAccount = async (accountId: string, userId: string) => {
    const account = await this.getAccountById(accountId, userId);

    const deletedAccount = await this.accountRepository.deleteAccount(
      account.id,
      account.userId
    );

    return deletedAccount;
  };
}
