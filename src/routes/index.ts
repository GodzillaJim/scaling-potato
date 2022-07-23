import { Router } from "express";
import { User } from "../models";
import authRoute from "./auth";
import userRoute from "./user";

const router = Router();

router.get("/", (_req, res) => {
  const user = new User();
  res.json(user.toJSON());
});
router.use("/auth", authRoute);
router.use("/user", userRoute);

export default router;
