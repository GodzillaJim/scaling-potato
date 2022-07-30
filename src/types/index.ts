export enum Role {
  END_USER = 0,
  ADMIN = 1,
  SUPER_ADMIN = 2,
}
export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  modifiedAt: Date;
  disabled: Date;
  verified: boolean;
  emailVerfiedAt: Date;
  emailVertificationCode: string;
  roles: Role[];
}

export interface IContactForm {
  email: string;
  name: string;
  subject: string;
  message: string;
}
