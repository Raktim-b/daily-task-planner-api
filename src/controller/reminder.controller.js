const Reminder = require("../model/reminderModel");
const Task = require("../model/taskModel");
const httpStatusCode = require("../utils/httpStatusCode");
const logger = require("../utils/logger");

class ReminderController {
 
  async addReminder(req, res) {
    try {
      const { taskId, reminderTime, reminderType } = req.body;

      const task = await Task.findOne({
        where: {
          id: taskId,
          userId: req.user.id,
        },
      });

      if (!task) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Task not found",
        });
      }

      const existingReminder = await Reminder.findOne({
        where: {
          taskId,
        },
      });

      if (existingReminder) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Reminder already exists for this task",
        });
      }

      const reminder = await Reminder.create({
        taskId,
        reminderTime,
        reminderType,
      });

      logger.info(`Reminder added for task ${taskId}`);

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Reminder added successfully",
        reminder,
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async editReminder(req, res) {
    try {
      const { id } = req.params;

      const reminder = await Reminder.findByPk(id);

      if (!reminder) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Reminder not found",
        });
      }

      const task = await Task.findOne({
        where: {
          id: reminder.taskId,
          userId: req.user.id,
        },
      });

      if (!task) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized",
        });
      }

      await reminder.update(req.body);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Reminder updated successfully",
        reminder,
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteReminder(req, res) {
    try {
      const { id } = req.params;

      const reminder = await Reminder.findByPk(id);

      if (!reminder) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Reminder not found",
        });
      }

      const task = await Task.findOne({
        where: {
          id: reminder.taskId,
          userId: req.user.id,
        },
      });

      if (!task) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized",
        });
      }

      await reminder.destroy();

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Reminder deleted successfully",
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

module.exports = new ReminderController();
