const Joi = require("joi");

const createGenreSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": "Genre name must be a string",
    "string.empty": "Genre name is required",
  }),
  description: Joi.string().allow("").optional(),
}).options({ abortEarly: false });

const updateGenreSchema = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().allow("").optional(),
}).options({ abortEarly: false });

module.exports = {
  createGenreSchema,
  updateGenreSchema,
};
