import { Router } from "express";
import SubscriptionController from "../controllers/subscription.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export default Router()
  .put("/:userId/subscribe",authMiddleware, (req, res) =>{
    SubscriptionController.subscribe(req, res)})
  .put("/:userId/cancel", authMiddleware, (req, res) =>{
    SubscriptionController.cancelSubscription(req, res)
  });