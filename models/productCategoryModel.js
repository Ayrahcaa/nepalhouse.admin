const { DataTypes } = require("sequelize");
const db = require("../config/db");

const ProductCategory = db.define(
  "ProductCategory",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Image path will be stored here
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "Product_category",
  }
);

module.exports = ProductCategory;
