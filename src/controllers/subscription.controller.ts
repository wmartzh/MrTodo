import { Request, Response } from "express";
import subscriptionService from "../services/subscription.service";
import { BaseController } from "../types/base.controller";
class subscriptionController extends BaseController {
  updateSubscription(_req: Request | any, res: Response) {
    //console.log(_req.params);
    try {
      const result = subscriptionService.updateSubscription( _req.params.userId );
    } catch (error) {
      
    }
    this.responseHandler(res, "Hola", 200);
  }
}

export default new subscriptionController();
