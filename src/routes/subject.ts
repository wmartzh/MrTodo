import { Router } from "express";
import subjectController from "../controllers/subject.controller";

export default Router()
  .post("/", (req, res) => subjectController.create(req, res))
  .get("/", (req, res) => subjectController.getSujectByUser(req, res))
  .get("/:id", (req, res) => subjectController.getSubjectById(req, res));
