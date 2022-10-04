import { Request, Response } from "express";
import { LoginSchema, RegisterUserSchema } from "../models/auth.model";
import authService from "../services/auth.service";
import { BaseController } from "../types/base.controller";

class AuthController extends BaseController {
  /**
   * It validates the request body using the RegisterUserSchema, then calls the authService.register
   * function, and finally returns a response to the client
   * @param {Request} req - Request - The request object
   * @param {Response} res - Response - The response object that will be sent back to the client.
   */
  async register(req: Request, res: Response) {
    try {
      const data = await RegisterUserSchema.validateAsync(req.body);
      const result = await authService.register({
        updatedAt: new Date(),
        ...data,
      });
      this.responseHandler(
        res,
        { message: `User ${result.username} created successfully` },
        200
      );
    } catch (error: any) {
      if (error.code && error.code === "P2002") {
        this.responseHandler(res, { error: "User was already register" }, 400);
      } else {
        this.errorHandler(res, error);
      }
    }
  }

  /**
   * It validates the request body against the LoginSchema, then calls the login function in the
   * authService, and finally sends the result to the responseHandler
   * @param {Request} req - Request - The request object
   * @param {Response} res - Response - This is the response object that will be sent back to the
   * client.
   */
  async login(req: Request, res: Response) {
    try {
      const data = await LoginSchema.validateAsync(req.body);
      const result = await authService.login(data.email, data.password);
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      console.log(
        "🔰 > file: auth.controller.ts > line 47 > AuthController > login > error",
        error
      );
      this.errorHandler(res, error);
    }
  }
}

export default new AuthController();
