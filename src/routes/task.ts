import { Router } from "express";
import taskController from "../controllers/task.controller";

export default Router()
  .post("/", (req, res) => taskController.create(req, res))
  .get("/", (req, res) => taskController.getTaskByUser(req, res))
  .get("/:id", (req, res) => taskController.getTaskById(req, res))
  .put("/:id", (req, res) => taskController.changeState(req, res));
