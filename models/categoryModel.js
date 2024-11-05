const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Category = db.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.ENUM("Top Categories", "Gift", "Services"),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Path to the uploaded image
    },
    description: {
      type: DataTypes.TEXT, // New description field
      allowNull: true, // Optional field
    },
  },
  {
    timestamps: false,
    tableName: "category",
  }
);

module.exports = Category;
