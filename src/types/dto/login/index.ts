import { IsEmail, IsNotEmpty } from "class-validator";

export default class Login {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
