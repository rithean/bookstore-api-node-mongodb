const Joi = require("joi");
const mongoose = require("mongoose");

// Custom validator for ObjectId
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message(`"${helpers.state.path}" must be a valid ObjectId`);
  }
  return value;
};

// Book creation validation
const createBookSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),
  authorId: Joi.string().custom(objectId).required(),
  genreIds: Joi.array().items(Joi.string().custom(objectId)).min(1).required(),
  year: Joi.number().min(1000).max(new Date().getFullYear()).required(),
}).options({ abortEarly: false });

// Book update validation (fields optional)
const updateBookSchema = Joi.object({
  title: Joi.string().trim().max(100).optional(),
  authorId: Joi.string().custom(objectId).optional(),
  genreIds: Joi.array().items(Joi.string().custom(objectId)).optional(),
  year: Joi.number().min(1000).max(new Date().getFullYear()).optional(),
}).options({ abortEarly: false });

module.exports = {
  createBookSchema,
  updateBookSchema,
};
