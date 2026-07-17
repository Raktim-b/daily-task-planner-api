const Task = require("../model/taskModel");
const { Op, fn, literal, col } = require("sequelize");
const httpStatusCode = require("../utils/httpStatusCode");
const logger = require("../utils/logger");
const sendTaskSummaryEmail = require("../utils/sendTaskSummaryMail");

class ReportController {
  async taskSummary(req, res) {
    try {
      const { type, date } = req.query;

      if (!date) {
        return res.status(400).json({
          success: false,
          message: "Date is required",
        });
      }

      let startDate;
      let endDate;
      if (type === "day") {
        startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
      } else if (type === "week") {
        startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        endDate.setHours(23, 59, 59, 999);
      } else {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Type must be day or week",
        });
      }

      const summary = await Task.findAll({
        attributes: [
          [fn("COUNT", literal("*")), "totalTasks"],

          [
            fn(
              "SUM",
              literal(`CASE WHEN status = 'Completed' THEN 1 ELSE 0 END`),
            ),
            "completedTasks",
          ],

          [
            fn(
              "SUM",
              literal(`CASE WHEN status = 'Pending' THEN 1 ELSE 0 END`),
            ),
            "pendingTasks",
          ],
        ],

        where: {
          userId: req.user.id,
          dueDate: {
            [Op.between]: [startDate, endDate],
          },
        },

        raw: true,
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        summary: summary[0],
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async taskInsights(req, res) {
    try {
      const insight = await Task.findAll({
        attributes: [
          // Total Tasks
          [fn("COUNT", col("id")), "totalTasks"],

          // Completed Tasks
          [
            fn(
              "SUM",
              literal("CASE WHEN status='Completed' THEN 1 ELSE 0 END"),
            ),
            "completedTasks",
          ],

          // Completion Percentage
          [
            literal(`
                        ROUND(
                            (
                                SUM(CASE WHEN status='Completed' THEN 1 ELSE 0 END)
                                /
                                COUNT(id)
                            ) * 100,
                        2)
                    `),
            "completionPercentage",
          ],

          // Average Completion Time (Days)
          [
            fn("AVG", literal("DATEDIFF(completedAt, createdAt)")),
            "averageCompletionDays",
          ],
        ],

        where: {
          userId: req.user.id,
        },

        raw: true,
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        insights: insight[0],
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async sendTaskSummary(req, res) {
    try {
      const userId = req.user.id;

      const overdueTasks = await Task.findAll({
        where: {
          userId,
          status: "Pending",
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
      });

      const upcomingTasks = await Task.findAll({
        where: {
          userId,
          status: "Pending",
          dueDate: {
            [Op.gte]: new Date(),
          },
        },
      });

      const completedTasks = await Task.findAll({
        where: {
          userId,
          status: "Completed",
        },
      });

      await sendTaskSummaryEmail(
        req.user,
        overdueTasks,
        upcomingTasks,
        completedTasks,
      );

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Summary sent successfully.",
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

module.exports = new ReportController();
