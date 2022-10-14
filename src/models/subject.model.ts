import Joi from "joi";

export const CreateSubjectSchema = Joi.object({
  name: Joi.string().required(),
  detail: Joi.string(),
  color: Joi.date(),
});
