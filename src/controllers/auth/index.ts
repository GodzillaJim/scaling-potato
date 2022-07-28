import { NextFunction, Request, Response } from "express";

import { boundClass } from "autobind-decorator";
import NewAccount from "../../types/dto/registration";
import Account from "../../services/auth/accounts";
import Login from "../../types/dto/login";

@boundClass
export default class AuthController {
  accountService: Account;

  constructor() {
    this.accountService = new Account();
  }

  public async registerNewUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const newUser: NewAccount = req.body;
      await this.accountService.registerNewAccount(newUser);
      res.status(200).json({ success: true, data: "Check email to continue" });
    } catch (e) {
      next(e);
    }
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: Login = req.body;
      const tokenInfo = await this.accountService.loginUser(user);
      res.status(200).json(tokenInfo);
    } catch (e) {
      next(e);
    }
  }
}
