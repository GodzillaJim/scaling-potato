import createHttpError from "http-errors";
import NewAccount from "../../../types/dto/registration";
import { User } from "../../../models";
import AuthService from "../tools";
import Login from "../../../types/dto/login";

export default class Account {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async registerNewAccount(account: NewAccount) {
    const user = await User.findOne({ email: account.email });
    if (user) {
      throw new createHttpError.BadRequest("This email is already registered.");
    }
    const { salt, hash } = this.authService.encryptPassword(account.password);
    const newUser = new User();
    newUser.email = account.email;
    newUser.firstName = account.firstName;
    newUser.lastName = account.lastName;
    newUser.password = hash;
    newUser.salt = salt;
    newUser.roles = await this.authService.getDefaultRoles();
    if (account.avatar) {
      newUser.avatar = account.avatar;
    }
    await newUser.save();
    return { success: true, message: "Account created successfully!" };
  }

  public async loginUser({ email, password }: Login) {
    const user: any = await User.findOne({ email });
    if (!user) {
      const error = new createHttpError.BadRequest(
        "This person does not exist!"
      );
      error.status = 400;
      throw error;
    }
    const isPassValid = this.authService.validatePassword(
      password,
      user.password,
      user.salt
    );
    if (!isPassValid) {
      const error = new createHttpError.BadRequest(
        "Wrong username or password!"
      );
      error.status = 400;
      throw error;
    }

    const token = this.authService.generateJwtToken({
      email,
      firstName: user.firstName,
      roles: user.roles.map(({ name }: { name: string }) => name),
    });
    return { ...token, firstName: user.firstName, avatar: user.avatar };
  }
}
