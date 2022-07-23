import express, { Router } from "express";

import AuthController from "../../controllers/auth.controller";
import { mainLimiter } from "../../middleware/limiters";

const router: Router = express.Router();

const authController = new AuthController();
router.route("/").post([mainLimiter, authController.authUser]);

export default router;
