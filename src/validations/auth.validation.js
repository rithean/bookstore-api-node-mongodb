const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().min(0).max(120).optional(),
  phone: Joi.string()
    .pattern(/^[0-9+\-() ]{7,20}$/)
    .optional(),
  address: Joi.string().optional(),
  role: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
}).options({ abortEarly: false });

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({ abortEarly: false });

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
}).options({ abortEarly: false });

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  age: Joi.number().min(0).max(120).optional(),
  phone: Joi.string()
    .pattern(/^[0-9+\-() ]{7,20}$/)
    .optional(),
  address: Joi.string().optional(),
  role: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
}).options({ abortEarly: false });

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  updateUserSchema,
};
