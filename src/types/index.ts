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

export enum Role {
  USER,
  ADMIN,
  SUPERADMIN,
}
