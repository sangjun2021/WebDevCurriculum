const { sequelize } = require("./base");
const { DataTypes } = require("sequelize");

const userModel = sequelize.define("User", {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = userModel;
