import { Request, Response } from "express";
import TaskService from "../../../services/task";
import TaskDTO from "../../../types/dto/task/create";
import createErrorResponse from "../../../errors";
import TaskID from "../../../types/dto/task/findOne";

export default class ClassController {
  public static async createTask(req: Request, res: Response) {
    try {
      const userEmail = res.locals.user.email;
      const task = req.body as unknown as TaskDTO;
      const response = {
        status: 200,
        data: await TaskService.createTask(task, userEmail),
      };
      return res.json(response);
    } catch (e) {
      return res.status(500).json(createErrorResponse(e));
    }
  }

  public static async getUserTasks (req: Request, res: Response){
    try{
      const userEmail = res.locals.user.email;
      const tasks = await TaskService.getUserTasks(userEmail);
      res.json({ status: 200, data: tasks })
    }catch (e) {
      return res.status(500).json(createErrorResponse(e));
    }
  }

  public static async getTaskById(req: Request, res: Response) {
    try {
      const id = req.body as unknown as TaskID;
      const task = await TaskService.getTaskById(id);
      if (!task) {
        res
          .status(404)
          .json(
            createErrorResponse(
              { message: `Task with id: ${id.id} does not exist` },
              404
            )
          );
      }
      res.json({ status: 200, data: task });
    } catch (e) {
      res.status(500).json(createErrorResponse(e));
    }
  }
}
