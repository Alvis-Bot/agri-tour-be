import * as Joi from "joi";

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid("dev", "prod", "test").required(),
  PORT: Joi.number().default(3000),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432).required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  FOLDER_UPLOAD: Joi.string().required(),
});
