const express = require("express");

const AuthCheck = require("../middleware/auth");
const reminderController = require("../controller/reminder.controller");
const reminderRouter = express.Router();

reminderRouter.post("/add", AuthCheck, reminderController.addReminder);
reminderRouter.put("/edit/:id", AuthCheck, reminderController.editReminder);
reminderRouter.delete(
  "/delete/:id",
  AuthCheck,
  reminderController.deleteReminder,
);

module.exports = reminderRouter;
