import express, { Router } from "express";

import UserController from "../../controllers/user.controller";
import { mainLimiter } from "../../middleware/limiters";
import AuthChecker from "../../middleware/auth";
import { Role } from "../../types";

const router: Router = express.Router();
const userController = new UserController();
const authCheck = new AuthChecker();

router
  .route("/")
  .get([
    mainLimiter,
    authCheck.isAuthenticated,
    authCheck.isAuthorized(Role.END_USER),
    userController.getUsers,
  ]);
router
  .route("/:id")
  .get([mainLimiter, userController.getSingleUser])
  .delete([mainLimiter, userController.removeUser])
  .put([mainLimiter, userController.updateUser]);

export default router;
