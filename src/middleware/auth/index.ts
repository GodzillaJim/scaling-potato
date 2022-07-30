import { NextFunction, Response, Request } from "express";
import { isEmpty } from "lodash";
import { constants } from "http2";
import AuthService from "../../services/auth/tools";
import { Role } from "../../types";
import logger from "../../config/logger.config";
import createErrorResponse from "../../errors";

const { HTTP_STATUS_UNAUTHORIZED } = constants;

export default class AuthChecker {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public static async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.header("Authorization");
      if (token || !isEmpty(token)) {
        const decoded: any = AuthService.verifyToken(token.split(" ")[1]);
        if (decoded) {
          const { email, firstName, roles } = decoded.payload;
          res.locals = { user: { email, firstName, roles } };
          return next();
        }
      }
      return res
        .status(HTTP_STATUS_UNAUTHORIZED)
        .json(
          createErrorResponse(
            { message: "Please provide a valid token on header" },
            HTTP_STATUS_UNAUTHORIZED
          )
        );
    } catch (e) {
      return res.status(500).json(createErrorResponse(e));
    }
  }

  public static checkAuthorization = (role: Role, roles: string[]) => {
    try {
      const isAuthorization = roles.find((permission) => {
        console.log("Comparison: ", permission, role.toString());
        return `${permission}` === role.toString();
      });
      if (isAuthorization) {
        return true;
      }
    } catch (e) {
      logger.error(e);
    }
    return false;
  };

  public static isAuthorized =
    (role: Role) => (_req: Request, res: Response, next: NextFunction) => {
      try {
        const { user } = res.locals;
        const { roles } = user;

        const isAuthorized = AuthChecker.checkAuthorization(role, roles);
        if (isAuthorized) {
          return next();
        }
        return res
          .status(403)
          .json(createErrorResponse({ message: "Unauthorized" }, 403));
      } catch (e: any) {
        logger.error(e);
        return res.status(500).json(createErrorResponse(e, 500));
      }
    };
}
