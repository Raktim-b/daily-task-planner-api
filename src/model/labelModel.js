const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbCon");
const User = require("./userModel");

const Label = sequelize.define(
  "label",
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

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Label;
