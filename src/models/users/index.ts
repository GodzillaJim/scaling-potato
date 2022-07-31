import { Schema, model } from "mongoose";

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
  emailVerifiedAt: {
    type: Date,
    default: undefined,
  },
  emailVerificationCode: String,
  avatar: {
    type: String,
    default: "https://thispersondoesnotexist.com",
  },
  salt: String,
  roles: {
    type: Array,
    default: [],
  },
});

export default model("User", UserSchema);
