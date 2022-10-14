import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import SubscriptionService from "../services/subscription.service";
import { BaseController } from "../types/base.controller";
class SubscriptionController extends BaseController {
  async subscribe(_req: Request, res: Response) {
    try {
      const result = await SubscriptionService.updateSubscription( _req.params.userId, "PREMIUM" );
      this.responseHandler(res, result, 200);
    } catch (error) {
      this.errorHandler(res, error);
    }
      

  }
  async cancelSubscription(_req: Request | any, res: Response) {
    //console.log(_req.params);
    try {
      const result = await SubscriptionService.updateSubscription( _req.params.userId, "FREE" );
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      if (error.code === "P2025") {
        this.errorHandler(res, { message: "Subscription not found" });
      }else{
        this.errorHandler(res, error);
      }
      
    }
    
  }
}

export default new SubscriptionController();
