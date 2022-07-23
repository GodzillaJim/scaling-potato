import { NextFunction, Request, Response } from "express";

import UserModel from "../models/users";
import bcrypt from "bcryptjs";
import { boundClass } from "autobind-decorator";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

const User = UserModel;

@boundClass
export default class AuthController {
  constructor() {
    //
  }

  async authUser(req: Request, res: Response, next: NextFunction) {
    //
  }
}
