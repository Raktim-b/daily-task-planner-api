const express = require("express");

const AuthCheck = require("../middleware/auth");
const reportController = require("../controller/report.controller");
const reportRouter = express.Router();

reportRouter.post("/summary", AuthCheck, reportController.taskSummary);
reportRouter.get("/insight", AuthCheck, reportController.taskInsights);
reportRouter.get("/task-email", AuthCheck, reportController.sendTaskSummary);

module.exports = reportRouter;
