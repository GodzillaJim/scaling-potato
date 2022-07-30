import mongoose from "mongoose";
import { Role } from "../../types";

export const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: Role,
      default: Role.END_USER,
    },
    createdBy: String,
  },
  { timestamps: true }
);

export default mongoose.model("Role", RoleSchema);
