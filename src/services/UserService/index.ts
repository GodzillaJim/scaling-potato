import User from "../../models/users";

export default class UserService {
  public static async getAllUsers(): Promise<typeof User[]> {
    return User.find();
  }
}
