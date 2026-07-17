const Category = require("./categoryModel");
const Label = require("./labelModel");
const Reminder = require("./reminderModel");
const Task = require("./taskModel");
const User = require("./userModel");
const EmailVerification = require("./verificationModel");

// User to Category
User.hasMany(Category, {
  foreignKey: "userId",
});
Category.belongsTo(User, {
  foreignKey: "userId",
});

// User to Task
User.hasMany(Task, {
  foreignKey: "userId",
});
Task.belongsTo(User, {
  foreignKey: "userId",
});

// User to Label
User.hasMany(Label, {
  foreignKey: "userId",
});
Label.belongsTo(User, {
  foreignKey: "userId",
});

// Category to Task
Category.hasMany(Task, {
  foreignKey: "categoryId",
});
Task.belongsTo(Category, {
  foreignKey: "categoryId",
});

// Label to Task
Task.belongsToMany(Label, {
  through: "TaskLabels",
  foreignKey: "taskId",
});
+Label.belongsToMany(Task, {
  through: "TaskLabels",
  foreignKey: "labelId",
});

// Label to Task
Task.hasOne(Reminder, {
  foreignKey: "taskId",
});
Reminder.belongsTo(Task, {
  foreignKey: "taskId",
});
module.exports = {
  User,
  Task,
  EmailVerification,
  Category,
  Label,
};
