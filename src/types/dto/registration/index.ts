import { IsEmail, IsNotEmpty } from "class-validator";

export default class NewAccount {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  avatar?: string
}
