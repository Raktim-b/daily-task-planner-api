const express = require("express");
const authRouter = require("./auth.routes");
const categoryRouter = require("./category.routes");
const taskRouter = require("./task.routes");
const reminderRouter = require("./reminder.routes");
const reportRouter = require("./report.routes");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/task", taskRouter);
router.use("/reminder", reminderRouter);
router.use("/report", reportRouter);

module.exports = router;
