import { User } from "@prisma/client";
import { Request, Response } from "express";
import { getUser } from "../helpers/auth.utils";
import { CreateSubjectSchema } from "../models/subject.model";
import subjectService from "../services/subject.service";
import { BaseController } from "../types/base.controller";

class SubjectController extends BaseController {
  async create(req: Request | any, res: Response) {
    try {
      const subjectData = await CreateSubjectSchema.validateAsync(req.body);
      this.responseHandler(
        res,
        await new subjectService().create(req.user, subjectData),
        200
      );
      console.log(subjectData);
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }
}
export default new SubjectController();
