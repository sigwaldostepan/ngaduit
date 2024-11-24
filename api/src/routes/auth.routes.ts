import express from "express";
import { AuthController } from "../controllers/auth.controllers";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import {
  validateLoginBody,
  validateRegisterBody,
} from "../middlewares/validation";
import { requireUser } from "../middlewares/requireUser";

const router = express.Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// http://url/auth/register
router.post("/register", validateRegisterBody, authController.register);
// http://url/auth/login
router.post("/login", validateLoginBody, authController.login);
// http://url/auth/logout
router.post("/logout", requireUser, authController.logout);
// http://url/auth/check-session
router.get("/check-session", requireUser, authController.checkSession);

export default router;
