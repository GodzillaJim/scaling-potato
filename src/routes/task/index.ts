import express, { Router } from "express";
import mainLimiter from "../../middleware/limiters";
import AuthChecker from "../../middleware/auth";
import { Role } from "../../types";
import TaskController from "../../controllers/task/TaskController";
import validators from "../../tools/validators";
import TaskDTO from "../../types/dto/task/create";
import TaskID from "../../types/dto/task/findOne";

const router: Router = express.Router();

router
  .route("/")
  .post([
    mainLimiter,
    AuthChecker.isAuthenticated,
    AuthChecker.isAuthorized(Role.END_USER),
    validators.validateInput(TaskDTO),
    TaskController.createTask,
  ]);
router
  .route("/id")
  .post([
    mainLimiter,
    validators.validateInput(TaskID),
    TaskController.getTaskById,
  ]);
router.route("/user").get([mainLimiter
, AuthChecker.isAuthenticated, TaskController.getUserTasks])

export default router;
