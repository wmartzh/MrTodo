import { Router } from "express";
import exampleController from "../controllers/example.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
//Definition of every endpoint from source
export default Router().get("/", authMiddleware, (req, res) =>
  exampleController.helloWorld(req, res)
);
