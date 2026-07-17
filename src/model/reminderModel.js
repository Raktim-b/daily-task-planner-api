const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbCon");
const Task = require("./taskModel");

const Reminder = sequelize.define(
  "reminder",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    reminderTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    reminderType: {
      type: DataTypes.ENUM("Once", "Daily", "Weekly"),
      allowNull: false,
      defaultValue: "Once",
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Reminder;
