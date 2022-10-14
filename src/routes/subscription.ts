import { Router } from "express";
import subscriptionController from "../controllers/subscription.controller";

export default Router()
  .put("/:userId", subscriptionController.updateSubscription)