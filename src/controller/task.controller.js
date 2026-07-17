const Task = require("../model/taskModel");
const Category = require("../model/categoryModel");
const Label = require("../model/labelModel");
const httpStatusCode = require("../utils/httpStatusCode");
const logger = require("../utils/logger");
const taskValidation = require("../validation/taskValidation");
const { Op } = require("sequelize");

class TaskController {
  async addTask(req, res) {
    try {
      const { error, value } = taskValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { title, description, priority, dueDate, categoryId, labelIds } =
        value;

      if (categoryId) {
        const category = await Category.findOne({
          where: {
            id: categoryId,
            userId: req.user.id,
          },
        });

        if (!category) {
          return res.status(httpStatusCode.NOT_FOUND).json({
            success: false,
            message: "Category not found",
          });
        }
      }

      const task = await Task.create({
        userId: req.user.id,
        title,
        description,
        priority,
        dueDate,
        categoryId,
      });

      if (labelIds && labelIds.length > 0) {
        await task.setLabels(labelIds);
      }

      const createdTask = await Task.findByPk(task.id, {
        include: [Category, Label],
      });

      logger.info(`Task created: ${task.title}`);

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Task created successfully",
        task: createdTask,
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async editTask(req, res) {
    try {
      const { id } = req.params;

      const { title, description, priority, dueDate, categoryId, labelIds } =
        req.body;

      const task = await Task.findOne({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!task) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Task not found",
        });
      }

      if (categoryId) {
        const category = await Category.findOne({
          where: {
            id: categoryId,
            userId: req.user.id,
          },
        });

        if (!category) {
          return res.status(httpStatusCode.NOT_FOUND).json({
            success: false,
            message: "Category not found",
          });
        }
      }

      await task.update({
        title,
        description,
        priority,
        dueDate,
        categoryId,
      });

      if (labelIds) {
        await task.setLabels(labelIds);
      }

      const updatedTask = await Task.findByPk(task.id, {
        include: [Category, Label],
      });

      logger.info(`Task updated: ${task.title}`);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Task updated successfully",
        task: updatedTask,
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async deleteTask(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findOne({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!task) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Task not found",
        });
      }

      await task.destroy();

      logger.info(`Task deleted: ${task.title}`);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async markTaskCompleted(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findOne({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!task) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Task not found",
        });
      }

      if (task.status === "Completed") {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Task is already completed",
        });
      }

      await task.update({
        status: "completed",
        completedAt: new Date(),
      });

      logger.info(`Task marked as completed: ${task.title}`);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Task marked as completed successfully",
        task,
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async listTasks(req, res) {
    try {
      const { status, priority, categoryId, dueDate } = req.query;

      const where = {
        userId: req.user.id,
      };

      if (status) {
        where.status = status;
      }

      if (priority) {
        where.priority = priority;
      }

      if (categoryId) {
        where.categoryId = categoryId;
      }

      const today = new Date();

      if (dueDate === "today") {
        const start = new Date(today.setHours(0, 0, 0, 0));
        const end = new Date(today.setHours(23, 59, 59, 999));

        where.dueDate = {
          [Op.between]: [start, end],
        };
      }

      if (dueDate === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const start = new Date(tomorrow.setHours(0, 0, 0, 0));
        const end = new Date(tomorrow.setHours(23, 59, 59, 999));

        where.dueDate = {
          [Op.between]: [start, end],
        };
      }

      if (dueDate === "week") {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setDate(end.getDate() + 7);
        end.setHours(23, 59, 59, 999);

        where.dueDate = {
          [Op.between]: [start, end],
        };
      }

      const tasks = await Task.findAll({
        where,
        include: [Category, Label],
        order: [["order", "ASC"]],
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        total: tasks.length,
        tasks,
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async reorderTasks(req, res) {
    try {
      const { tasks } = req.body;

      for (const item of tasks) {
        await Task.update(
          {
            order: item.order,
          },
          {
            where: {
              id: item.id,
              userId: req.user.id,
            },
          },
        );
      }

      logger.info("Tasks reordered successfully");

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Tasks reordered successfully",
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new TaskController();
