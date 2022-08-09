/* eslint-disable no-unused-vars */
export enum Role {
  END_USER = 0,
  ADMIN = 1,
  SUPER_ADMIN = 2,
}
export interface IContactForm {
  email: string;
  name: string;
  subject: string;
  message: string;
}
