import { Schema, model } from "mongoose";

import { RoleSchema } from "../roles";
import crypto from "crypto";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  emailVerfiedAt: {
    type: Date,
    default: undefined,
  },
  emailVerificationCode: String,
  salt: String,
  roles: {
    type: [RoleSchema],
    default: [],
  },
});

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha1").toString("hex");
};

UserSchema.methods.validatePassword = function (password: string) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha1").toString("hex");
  return this.password === hash;
};

export default model("User", UserSchema);
