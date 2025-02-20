import express from 'express';
import { requireUser } from '../middlewares/requireUser';
import { validateBody } from '../middlewares/validation';
import { AccountRepository } from '../repositories/account.repository';
import { AccountService } from '../services/account.service';
import { AccountController } from '../controllers/account.controller';
import {
  addAccountSchema,
  editAccountSchema,
  topUpSchema,
} from '../schemas/account';

const router = express.Router();

const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

router.get('/accounts/', requireUser, accountController.getAccounts);
router.get('/accounts/:id', requireUser, accountController.getAccountById);
router.get('/total-balance', requireUser, accountController.getTotalBalance);
router.post(
  '/accounts/',
  requireUser,
  validateBody(addAccountSchema),
  accountController.addAccount
);
router.post(
  '/accounts/:id/top-up',
  requireUser,
  validateBody(topUpSchema),
  accountController.topUp
);
router.put(
  '/accounts/:id',
  requireUser,
  validateBody(editAccountSchema),
  accountController.editAccount
);
router.delete('/:id', requireUser, accountController.deleteAccount);

export default router;
