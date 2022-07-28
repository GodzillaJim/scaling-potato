import express, { Router } from "express";

import { mainLimiter } from "../../middleware/limiters";
import AuthController from "../../controllers/auth";
import validators from "../../tools/validators";
import NewAccount from "../../types/dto/registration";
import Login from "../../types/dto/login";

const router: Router = express.Router();

const authController = new AuthController();
router
  .route("/register")
  .post([
    mainLimiter,
    validators.validateInput(NewAccount),
    authController.registerNewUser,
  ]);
router
  .route("/login")
  .post([
    mainLimiter,
    validators.validateInput(Login),
    authController.loginUser,
  ]);

export default router;
