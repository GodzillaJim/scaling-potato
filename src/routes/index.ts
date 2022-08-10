import { Router, Response, Request } from "express";
import authRoute from "./auth";
import userRoute from "./user";
import guestRoute from "./guest";
import taskRouter from "./task";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/guest", guestRoute);
router.use("/task", taskRouter);

/**
 * Handler root access, health check only
 * @param _req
 * @param res
 */
const handler = (_req: Request, res: Response) => {
  res.json({ health: "Okay", message: "Hello world" });
};
router.get("/", handler);

export default router;
