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
const checkAndAddUser = require('../../../utils/checkAndAddUser.js')

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/\s+/);
        const command = args.shift().toLowerCase();

        if (command === "showshop") {
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
                
                const user = await checkAndAddUser(message.member);

                const embedMain = new EmbedBuilder()
                    .setColor('DarkRed')
                    // .setTitle('🛍️ МАГАЗИН')
                    // .setImage('https://cdn.discordapp.com/attachments/1348700162255753284/image.png') // вставь свою картинку
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

                // Строка 1 — кнопка "Товары за монетки"
                const row1 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('shop_open_coins')
                        .setLabel('🪙 Товары за монетки')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('shop_open_crystals')
                        .setLabel('💎 Товары за кристаллы')
                        .setStyle(ButtonStyle.Secondary)
                );


                // Строка 3 — кнопка "Купить кристаллы"
                const row3 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('shop_buy_roles')
                        .setLabel('🎭 Купить роли')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('shop_buy_crystals')
                        .setLabel('🛒 Купить кристаллы')
                        .setStyle(ButtonStyle.Secondary)
                );

                await message.channel.send({
                    embeds: [embedMain],
                    components: [row1, row3]
                });

            } catch (error) {
                console.error('Ошибка в команде showshop:', error);
                message.channel.send('Произошла ошибка при выполнении команды.');
            }
        }
    },
};
