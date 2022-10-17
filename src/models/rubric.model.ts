import Joi from "joi";
import { Decimal } from '@prisma/client/runtime';

export const CreateRubricSchema = Joi.object({
  name: Joi.string().required(),
  percentage: Joi.number(),
});
