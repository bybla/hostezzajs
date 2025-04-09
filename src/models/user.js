// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
  discord_user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  background_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color_nick: {  // хранит ид роли
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inventory: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: false, // Отключаем автоматическое добавление createdAt и updatedAt
});

module.exports = User;
