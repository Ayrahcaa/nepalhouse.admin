const { Sequelize } = require("sequelize");

const db = new Sequelize("nepalhouse", "root", "7510", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
