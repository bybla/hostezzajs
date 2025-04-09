// utils/database.js
const { Sequelize, Op } = require('sequelize');
const User = require('../models/user'); // Импортируем модель пользователя

// Функция для изменения ника пользователя
async function changeNick(user_id, new_nick) {
    try {
        // Находим пользователя по user_id
        const user = await User.findOne({
            where: {
                discord_user_id: user_id,
            },
        });

        // Если пользователь не найден, выбрасываем ошибку
        if (!user) {
            throw new Error('Пользователь не найден.');
        }

        // Обновляем ник пользователя
        user.username = new_nick;
        await user.save(); // Сохраняем изменения в базе данных

        console.log(`Ник для пользователя ${user_id} изменен на ${new_nick}`);
        return user;  // Возвращаем обновленного пользователя
    } catch (error) {
        console.error('Ошибка при изменении ника:', error);
        throw error; // Пробрасываем ошибку выше
    }
}

module.exports = { changeNick };
