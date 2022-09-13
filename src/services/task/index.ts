/* eslint-disable no-return-await */
import TaskDTO from "../../types/dto/task/create";
import Task from "../../models/task";
import TaskID from "../../types/dto/task/findOne";

export default class TaskService {
  public static async createTask(task: TaskDTO, ownerEmail: string) {
    const newTask = new Task();
    newTask.name = task.name;
    newTask.owner = ownerEmail;
    return await newTask.save();
  }

  public static async getTaskById(taskId: TaskID) {
    return await Task.findById(taskId.id);
  }

  /* Get tasks per user
  * */
  public static async getUserTasks(userEmail: string) {
    if(!userEmail || userEmail === ""){
      throw new Error("Please login to continue");
    }
    return await Task.find({ owner: userEmail })
  }
}
