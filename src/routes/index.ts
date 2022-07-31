import { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";
import guestRoute from "./guest";
import taskRouter from "./task";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/guest", guestRoute);
router.use("/task", taskRouter);

export default router;
