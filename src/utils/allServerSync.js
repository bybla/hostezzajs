// utils/allServerSync.js
const addUserIfNotExists = require('./checkAndAddUser'); // Импортируем функцию для добавления пользователя

/**
 * Проверяет всех участников сервера и добавляет их в базу данных, если они отсутствуют.
 * @param {import('discord.js').Guild} guild - Объект сервера
 */
 const addAllServerUsers = async (guild) => {
    try {
      // Задаем лимит на количество участников, которое загружается за один запрос
      const limit = 1000; // Например, по 1000 участников за один запрос
      let members = [];
      let lastFetched = null;
  
      // Загружаем участников постранично
      do {
        const fetchedMembers = await guild.members.fetch({
          limit: limit,
          after: lastFetched, // Загружаем участников после последнего полученного
        });
        
        // Добавляем новых участников в массив
        members = [...members, ...fetchedMembers.values()];
        
        // Обновляем lastFetched для следующей страницы
        if (fetchedMembers.size > 0) {
          lastFetched = fetchedMembers.last().id;
        }
  
      } while (members.length < guild.memberCount); // Пока не загрузим всех участников
  
      // Теперь у нас есть все участники
      for (const member of members) {
        await addUserIfNotExists(
          member.id,
          member.user.username,
          0,
          null,
          null
        );
      }
  
      console.log(`Все участники сервера ${guild.name} проверены и добавлены в базу данных.`);
    } catch (error) {
      console.error('Ошибка при добавлении участников сервера в базу:', error);
    }
  };
  

module.exports = addAllServerUsers;
