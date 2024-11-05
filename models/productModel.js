const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Product = db.define(
  "Product",
  {
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ProductCategory",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "Product",
  }
);

module.exports = Product;
