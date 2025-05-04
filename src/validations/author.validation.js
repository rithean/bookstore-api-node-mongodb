const Joi = require("joi");

const createAuthorSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
  }),
  bio: Joi.string().allow("").optional(),
  birthdate: Joi.date().iso().optional(),
}).options({ abortEarly: false });

const updateAuthorSchema = Joi.object({
  name: Joi.string().trim().optional(),
  bio: Joi.string().allow("").optional(),
  birthdate: Joi.date().iso().optional(),
}).options({ abortEarly: false });

module.exports = {
  createAuthorSchema,
  updateAuthorSchema,
};
