const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbCon");
const User = require("./userModel");
const EmailVerification = sequelize.define(
  "emailVerification",
  {
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
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    timestamps: true,
  },
);

module.exports = EmailVerification;
