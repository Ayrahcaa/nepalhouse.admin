const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Review = db.define(
  "Review",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Path to the uploaded image
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "review",
  }
);

module.exports = Review;
