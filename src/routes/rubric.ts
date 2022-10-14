import { Router } from "express";
import rubricController from "../controllers/rubric.controller";

export default Router()
  .post("/", (req, res) => rubricController.create(req, res))
  .get("/:id", (req, res) => rubricController.getRubricById(req, res))