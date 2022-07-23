import mongoose from "mongoose";

export const RoleSchema = new mongoose.Schema(
  {
    name: String,
    createdBy: String,
  },
  { timestamps: true }
);

export default mongoose.model("Role", RoleSchema);
