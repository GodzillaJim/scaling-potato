export enum Role {
  END_USER,
  ADMIN,
  SUPERADMIN,
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
