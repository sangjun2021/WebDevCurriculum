const { sequelize } = require("./index");
const { DataTypes } = require("sequelize");

const postModel = sequelize.define("Post", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = postModel;
