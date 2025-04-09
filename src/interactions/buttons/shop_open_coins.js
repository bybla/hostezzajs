const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    MessageActionRow
} = require('discord.js');

module.exports = {
    customId: 'shop_open_coins',
    
    async execute(interaction) {
        const embedMain = new EmbedBuilder()
        .setTitle("ТОВАРЫ ЗА МОНЕТКИ")
        .setDescription(`× Смена фона\n× Сменить цвет ника\n× Сменить ник`)
        .setColor('DarkRed');

        const row1 = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select_coin_shop')
                .setPlaceholder("Выберите товар")
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('× Смена фона')
                        .setValue('bgLevel'), // уникальное значение для идентификации
                    new StringSelectMenuOptionBuilder()
                        .setLabel('× Сменить цвет ника')
                        .setValue('colorRole'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('× Сменить ник')
                        .setValue('nameChange')
                )
        );

        await interaction.reply({
            embeds: [embedMain],
            components: [row1],
            ephemeral: true,
        });
    },
};
