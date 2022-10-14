
import { Request, Response } from "express";
import { getUser } from "../helpers/auth.utils";
import { ChangeStateSchema, CreateTaskSchema } from "../models/tasks.model";
import taskService from "../services/task.service";
import { BaseController } from "../types/base.controller";
import { HttpError } from "../types/custom.error";

class TaskController extends BaseController {
  /**
   * It validates the request body against the CreateTaskSchema, then calls the taskService.create
   * function, and finally sends the response
   * @param {Request | any} req - Request | any:
   * @param {Response} res - Response - The response object that will be returned to the client.
   */
  async create(req: Request | any, res: Response) {
    try {
      const taskData = await CreateTaskSchema.validateAsync(req.body);
      this.responseHandler(
        res,
        await taskService.create(req.user, taskData),
        200
      );
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }

  /**
   * It gets the user id from the request object, and then passes it to the taskService.getTaskByUserId
   * function
   * @param {Request | any} req - Request | any: This is the request object that is passed to the route
   * handler.
   * @param {Response} res - Response - This is the response object that will be sent back to the client.
   */
  async getTaskByUser(req: Request | any, res: Response) {
    try {
      this.responseHandler(
        res,
        await taskService.getTaskByUserId(req.user.id),
        200
      );
    } catch (error) {
      this.errorHandler(res, error);
    }
  }

  /**
   * It gets a task by id
   * @param {Request | any} req - Request | any: This is the request object that is passed to the route
   * handler.
   * @param {Response} res - Response - This is the response object that will be sent back to the client.
   */
  async getTaskById(req: Request | any, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new HttpError({ error: "Task id is required" }, 400);
      }
      this.responseHandler(
        res,
        await taskService.findById(req.user.id, Number(id)),
        200
      );
    } catch (error) {
      this.errorHandler(res, error);
    }
  }

  /**
   * It changes the state of a task
   * @param {Request | any} req - Request | any: This is the request object that is passed to the route
   * handler.
   * @param {Response} res - Response - The response object that will be sent back to the client.
   */
  async changeState(req: Request | any, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new HttpError({ error: "Task id is required" }, 400);
      }
      const { state } = await ChangeStateSchema.validateAsync(req.body);

      this.responseHandler(
        res,
        await taskService.changeState(req.user.id, Number(id), state),
        200
      );
    } catch (error) {
      this.errorHandler(res, error);
    }
  }
}
export default new TaskController();
