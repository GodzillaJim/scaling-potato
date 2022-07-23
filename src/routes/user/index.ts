import express, { Router } from "express";

import UserController from "../../controllers/user.controller";
import { mainLimiter } from "../../middleware/limiters";

const router: Router = express.Router();
const userController = new UserController();

router.route("/").get([mainLimiter, userController.getUsers]);
router
  .route("/:id")
  .get([mainLimiter, userController.getSingleUser])
  .delete([mainLimiter, userController.removeUser])
  .put([mainLimiter, userController.updateUser]);

export default router;
