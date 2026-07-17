const Joi = require("joi");

const categoryValidation = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Category name must be a string.",
    "string.empty": "Category name is required.",
    "string.min": "Category name must be at least 3 characters.",
    "string.max": "Category name cannot exceed 100 characters.",
    "any.required": "Category name is required.",
  }),

  description: Joi.string().trim().allow("", null).max(500).messages({
    "string.base": "Description must be a string.",
    "string.max": "Description cannot exceed 500 characters.",
  }),
});

module.exports = categoryValidation;
