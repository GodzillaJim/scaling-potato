import { Request, Response } from "express";
import UserService from "../../services/UserService";
import createErrorResponse from "../../errors";

export default class UserController {
  public static async getUsers(_req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (e) {
      return res.json(createErrorResponse(e));
    }
  }
}
