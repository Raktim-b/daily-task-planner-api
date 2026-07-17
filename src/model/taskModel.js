const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbCon");
const User = require("./userModel");
const Category = require("./categoryModel");

const Task = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      allowNull: false,
      defaultValue: "Medium",
    },

    status: {
      type: DataTypes.ENUM("Pending", "Completed"),
      allowNull: false,
      defaultValue: "Pending",
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Category,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Task;
