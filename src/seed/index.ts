import { faker } from "@faker-js/faker";
import { Role, User } from "../models";
import logger from "../config/logger.config";
import AuthService from "../services/auth/tools";
import { Role as ERole } from "../types";

const roleList = [ERole.ADMIN, ERole.END_USER, ERole.SUPER_ADMIN];
const authService = new AuthService();
export const seedRoles = async () => {
  try {
    const roles = await Role.find({});
    if (roles.length === 0) {
      const roleArr = roleList.map((role: ERole) => {
        const temp = new Role();
        temp.name = role.toString();
        temp.createdBy = "GodzillaJim";
        return temp;
      });
      await Role.bulkSave(roleArr);
    }
  } catch (error) {
    logger.error(error);
  }
};

export const seedAdmin = async () => {
  try {
    const superAdmin = await User.findOne({
      email: "superadmin@collaborate.com",
    });
    if (!superAdmin) {
      const user = new User();
      const { salt, hash } = authService.encryptPassword("password123");
      user.email = "superadmin@collaborate.com";
      user.firstName = faker.name.firstName();
      user.lastName = faker.name.lastName();
      user.password = hash;
      user.salt = salt;
      user.imageUrl = faker.image.avatar();
      user.disabled = false;
      user.verified = true;
      user.emailVerifiedAt = new Date();
      user.emailVerificationCode = faker.word.noun(6);
      user.roles = await Role.find({});
      await user.save();
    }
  } catch (e) {
    logger.error(e);
  }
};
