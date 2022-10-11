import Joi from "joi";

export const CreateTaskSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  dueDate: Joi.date(),
});

export const ChangeStateSchema = Joi.object({
  state: Joi.string(),
});
