import { Request, Response } from "express";
import { BaseController } from "../types/base.controller";
import { HttpError } from "../types/custom.error";
import { CreateRubricSchema } from '../models/rubric.model';
import rubricService from "../services/rubric.service";

class RubricController extends BaseController {
  /**
   * It validates the request body against the CreateTaskSchema, then calls the taskService.create
   * function, and finally sends the response
   * @param {Request | any} req - Request | any:
   * @param {Response} res - Response - The response object that will be returned to the client.
   */
  async create(req: Request | any, res: Response) {
    try {
      const rubricData = await CreateRubricSchema.validateAsync(req.body);
      this.responseHandler(
        res,
        await rubricService.create(rubricData),
        200
      );
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }

//   /**
//    * It gets the user id from the request object, and then passes it to the taskService.getTaskByUserId
//    * function
//    * @param {Request | any} req - Request | any: This is the request object that is passed to the route
//    * handler.
//    * @param {Response} res - Response - This is the response object that will be sent back to the client.
//    */
//   async getTaskByUser(req: Request | any, res: Response) {
//     try {
//       this.responseHandler(
//         res,
//         await taskService.getTaskByUserId(req.user.id),
//         200
//       );
//     } catch (error) {
//       this.errorHandler(res, error);
//     }
//   }

  /**
   * It gets a task by id
   * @param {Request | any} req - Request | any: This is the request object that is passed to the route
   * handler.
   * @param {Response} res - Response - This is the response object that will be sent back to the client.
   */
  async getRubricById(req: Request | any, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new HttpError({ error: "Rubric id is required" }, 400);
      }
      this.responseHandler(
        res,
        await rubricService.getRubricById(Number(id)),
        200
      );
    } catch (error) {
      this.errorHandler(res, error);
    }
  }
}
export default new RubricController();