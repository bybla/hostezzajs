// utils/database.js
const { Sequelize } = require('sequelize');
const path = require('path');
// Создаем экземпляр Sequelize для подключения к базе данных SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../databases/databases.sqlite3'), // Путь к файлу базы данных
  logging: true, // Отключаем логирование SQL-запросов
});



module.exports = sequelize;
