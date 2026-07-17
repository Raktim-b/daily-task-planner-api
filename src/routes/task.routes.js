const express = require("express");

const AuthCheck = require("../middleware/auth");
const taskController = require("../controller/task.controller");
const taskRouter = express.Router();

taskRouter.post("/create", AuthCheck, taskController.addTask);
taskRouter.put("/update/:id", AuthCheck, taskController.editTask);
taskRouter.delete("/delete/:id", AuthCheck, taskController.deleteTask);
taskRouter.patch("/completed/:id", AuthCheck, taskController.markTaskCompleted);
taskRouter.get("/list", AuthCheck, taskController.listTasks);
taskRouter.post("/order", AuthCheck, taskController.reorderTasks);

module.exports = taskRouter;
