const Sequelize = require("sequelize");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME || config.database,
  process.env.DB_USER || config.username,
  process.env.DB_PASSWORD || config.password,
  config
);

db.sequelize = sequelize;

module.exports = db;
