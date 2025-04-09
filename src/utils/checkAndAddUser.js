const { Op } = require('sequelize');
const User = require('../models/user'); // Путь к вашей модели User

/**
 * Функция для проверки и добавления пользователя в базу данных.
 * @param {GuildMember} member - Объект участника сервера.
 * @returns {Promise<User>} - Промис с объектом пользователя.
 */
async function checkAndAddUser(member) {
  try {
    // Проверяем, существует ли пользователь в базе данных
    let user = await User.findOne({ where: { discord_user_id: member.id } });

    if (!user) {
      // Если пользователь не найден, создаем нового
      user = await User.create({
        discord_user_id: member.id,
        username: member.user.username,
        balance: 0, // Начальный баланс
        background_name: null,
        color_nick: null,
        inventory: [],
      });
      console.log(`Пользователь ${member.user.username} добавлен в базу данных.`);
    } else {
      console.log(`Пользователь ${member.user.username} уже существует в базе данных.`);
    }

    return user;
  } catch (error) {
    console.error('Ошибка при проверке или добавлении пользователя:', error);
    throw error;
  }
}

module.exports = { checkAndAddUser };