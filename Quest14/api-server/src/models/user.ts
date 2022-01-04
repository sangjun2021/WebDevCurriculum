import { DataTypes } from 'sequelize';

import sequelize from './base';

const userModel = sequelize.define('User', {
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

export default userModel;
