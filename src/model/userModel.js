const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbCon");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEy7pwqmpRqSf5t5v1dCOJsCsYlXeBGjIg3i3Z2HIzvg&s=10",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = User;
