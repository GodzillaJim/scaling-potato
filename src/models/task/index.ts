import { model, Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Task", TaskSchema);
