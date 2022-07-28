import { NextFunction, Response, Request } from "express";
import { isEmpty } from "lodash";
import createHttpError from "http-errors";
import AuthService from "../../services/auth/tools";
import { Role } from "../../types";

export default class AuthChecker {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.header("Authorization");
      if (!token || isEmpty(token)) {
        const error = new createHttpError.Unauthorized(
          "Please provide a token on header field Authorization"
        );
        error.status = 401;
        throw error;
      }
      const decoded: any = AuthService.verifyToken(token.split(" ")[1]);
      console.log("Decoded", decoded);
      if (!decoded) {
        const error = new createHttpError.Unauthorized(
          "Your session has expired!"
        );
        error.status = 401;
        throw error;
      }
      const { email, firstName, roles } = decoded.payload;
      res.locals = { user: { email, firstName, roles } };
      next();
    } catch (e) {
      next(e);
    }
  }

  public isAuthorized =
    (role: Role) => (_req: Request, res: Response, next: NextFunction) => {
      try {
        const { user } = res.locals;
        const { roles } = user;

        if (roles && roles.find((e: string) => e === role.toString())) {
          next();
        }
        throw new createHttpError.Forbidden("Please login to continue");
      } catch (e) {
        next(e);
      }
    };
}
