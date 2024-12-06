import express from "express";
import { requireUser } from "../middlewares/requireUser";
import { validateBody } from "../middlewares/validation";
import { AccountRepository } from "../repositories/account.repository";
import { AccountService } from "../services/account.service";
import { AccountController } from "../controllers/account.controller";
import { addAccountSchema, editAccountSchema, topUpSchema } from "../schemas/account";

const router = express.Router();

const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

// http://url/accounts (GET)
router.get("/", requireUser, accountController.getAccounts);
// http://url/accounts/:account-id (GET)
router.get("/:id", requireUser, accountController.getAccountById);
// http://url/accounts (POST)
router.post("/", requireUser, validateBody(addAccountSchema), accountController.addAccount);
// http://url/accounts/:account-id/top-up (POST)
router.post("/:id/top-up", requireUser, validateBody(topUpSchema), accountController.topUp);
// http://url/accounts/:account-id (PUT)
router.put("/:id", requireUser, validateBody(editAccountSchema), accountController.editAccount);
// http://url/accounts/:account-id (DELETE)
router.delete("/:id", requireUser, accountController.deleteAccount);

export default router;
