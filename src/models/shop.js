const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

// Создаем модель для товара
const Item = sequelize.define('Item', {
    displayName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    }, {
        tableName: 'item',
        timestamps: false, 
      });

module.exports = { Item };
