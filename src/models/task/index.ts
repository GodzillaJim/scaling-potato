import { model, Schema } from "mongoose";

const str = `function(){
  //Write code here
}`;
const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: { type: String, required: true },
    code: { type: String, required: false, default: str },
  },
  { timestamps: true }
);

export default model("Task", TaskSchema);
