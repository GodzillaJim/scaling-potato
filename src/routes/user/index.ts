import express, { Router } from "express";

import { mainLimiter } from "../../middleware/limiters";
import AuthChecker from "../../middleware/auth";
import { Role } from "../../types";
import UserController from "../../controllers/user";

const router: Router = express.Router();

router
  .route("/")
  .get([
    mainLimiter,
    AuthChecker.isAuthenticated,
    AuthChecker.isAuthorized(Role.END_USER),
    AuthChecker.isAuthorized(Role.ADMIN),
    UserController.getUsers,
  ]);

export default router;
