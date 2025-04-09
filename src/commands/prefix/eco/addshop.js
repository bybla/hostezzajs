const {
    Events,
    Message,
    EmbedBuilder,
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
const { prefix } = require('../../../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/\s+/);
        const command = args.shift().toLowerCase();

        if (command === "addshop") {
            try {
                if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                    const embedError = new EmbedBuilder()
                        .setColor('DarkRed')
                        .setTitle('Ошибка')
                        .addFields({ name: 'Причина:', value: 'Недостаточно прав.' })
                        .setFooter({ text: `Вызвано ${message.author.tag}` })
                        .setTimestamp();

                    return message.channel.send({ embeds: [embedError] });
                }

                const embedMain = new EmbedBuilder()
                    .setColor('DarkRed')
                    .setDescription("Форма заполнения Товаров.")
                    .addFields(
                        {
                            name: "🪙 МОНЕТКИ",
                            value: "Можно заработать любой серверной активностью: сообщениями, войсами, различными играми",
                            inline: true
                        },
                        {
                            name: "💎 КРИСТАЛЛЫ",
                            value: "Зарабатываются участием в глобальных ивентах, а также с помощью <#1348700162255753284>",
                            inline: true
                        }
                    );

                // Строка 1 — кнопка для открытия формы добавления товара
                const row1 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('add_item_form')
                        .setLabel('🛒 Добавить товар')
                        .setStyle(ButtonStyle.Primary)
                );

                await message.channel.send({
                    embeds: [embedMain],
                    components: [row1]
                });

            } catch (error) {
                console.error('Ошибка в команде showshop:', error);
                message.channel.send('Произошла ошибка при выполнении команды.');
            }
        }
    },
};
