const Joi = require("joi");

const taskValidation = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Task title is required",
    "string.min": "Task title must be at least 3 characters",
    "string.max": "Task title cannot exceed 100 characters",
    "any.required": "Task title is required",
  }),

  description: Joi.string().trim().allow("").optional(),

  priority: Joi.string().valid("Low", "Medium", "High").required().messages({
    "any.only": "Priority must be Low, Medium, or High",
    "any.required": "Priority is required",
  }),

  dueDate: Joi.date().required().messages({
    "date.base": "Due date must be a valid date",
    "any.required": "Due date is required",
  }),

  categoryId: Joi.string()
    .guid({
      version: "uuidv4",
    })
    .optional()
    .allow(null)
    .messages({
      "string.guid": "Category ID must be a valid UUID",
    }),

  labelIds: Joi.array()
    .items(
      Joi.string().guid({
        version: "uuidv4",
      }),
    )
    .optional()
    .messages({
      "string.guid": "Each Label ID must be a valid UUID",
    }),
});

module.exports = taskValidation;
