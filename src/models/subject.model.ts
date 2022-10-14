import Joi from "joi";

export const CreateSubjectSchema = Joi.object({
  name: Joi.string().required(),
  detail: Joi.string(),
  color: Joi.date(),
});

export const ChangeStateSchema = Joi.object({
  state: Joi.string(),
});
