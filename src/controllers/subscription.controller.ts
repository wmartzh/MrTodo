import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import SubscriptionService from "../services/subscription.service";
import { BaseController } from "../types/base.controller";
class SubscriptionController extends BaseController {
  async subscribe(req: Request | any, res: Response) {
    try {
      const result = await SubscriptionService.changeSubscriptionState(
        req.user.id,
        "PREMIUM"
      );
      this.responseHandler(res, result, 200);
    } catch (error) {
      this.errorHandler(res, error);
    }
  }
  async unSubscribe(req: Request | any, res: Response) {
    try {
      const result = await SubscriptionService.changeSubscriptionState(
        req.user.id,
        "FREE"
      );
      this.responseHandler(res, result, 200);
    } catch (error) {
      this.errorHandler(res, error);
    }
  }
}

export default new SubscriptionController();
