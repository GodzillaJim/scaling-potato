import crypto from "crypto";
import { isEqual } from "lodash";
import jwt from "jsonwebtoken";
import config from "../../../config";
import Role from "../../../models/roles";

export default class AuthService {
  private readonly salt: string;

  secret: string;

  expiration: string | number;

  private readonly defaultRole: string[];

  constructor() {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.defaultRole = ["endUser"];
    this.secret = config.jwt.secret;
    this.expiration = config.jwt.expiration;
  }

  public static verifyToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.secret, { complete: true });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async getDefaultRoles() {
    return await Role.find({ name: this.defaultRole });
  }

  public encryptPassword(password: string): {
    salt: string;
    hash: string;
  } {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
      .toString("hex");
    return { salt: this.salt, hash };
  }

  public validatePassword(
    password: string,
    hash: string,
    salt: string
  ): boolean {
    const candidateHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha1")
      .toString("hex");
    return isEqual(candidateHash, hash);
  }

  public generateJwtToken({
    email,
    firstName,
    roles,
  }: {
    email: string;
    firstName: string;
    roles: any;
  }): {
    token: string;
    expiresIn: string | number;
  } {
    const token = jwt.sign({ email, firstName, roles }, this.secret, {
      expiresIn: this.expiration,
    });
    return { token, expiresIn: this.expiration };
  }
}
