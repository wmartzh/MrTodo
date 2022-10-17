import { Router } from "express";
import SubscriptionController from "../controllers/subscription.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export default Router()
  .get("/subscribe", authMiddleware, (req, res) => {
    SubscriptionController.subscribe(req, res);
  })
  .get("/unsubscribe", authMiddleware, (req, res) => {
    SubscriptionController.unSubscribe(req, res);
  });
