// utils/getBalance.js
const { Sequelize, Op } = require('sequelize');
const User = require('../models/user'); 

async function getBalance(user_id) {
    try {

        const user = await User.findOne({
            where: {
                discord_user_id: user_id,
            },
        });

        if (!user) {
            throw new Error('Пользователь не найден.');
        }

        return user.balance;

    } catch (error) {
        console.error('Ошибка при изменении проверке:', error);
        throw error;
    }
}

module.exports = { getBalance };
