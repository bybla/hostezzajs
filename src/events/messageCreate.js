const { Events, Message, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    /**
     * Обработка сообщения
     * 
     * @param {Message} message - Сообщение пользователя
     */
    async execute(message) {
    },
};