import { IsEmail, IsNotEmpty } from "class-validator";

export default class ContactForm {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;

  constructor(email: string, name: string, subject: string, message: string) {
    this.email = email;
    this.name = name;
    this.subject = subject;
    this.message = message;
  }
}
