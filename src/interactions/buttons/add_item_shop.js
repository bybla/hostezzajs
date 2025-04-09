const {
    Events,
    MessageActionRow,
    MessageButton,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'add_item_form') {
            const modal = new ModalBuilder()
                .setCustomId('add_item_modal')
                .setTitle('Форма добавления товара');

            // Добавляем поля для ввода данных
            const nameInput = new TextInputBuilder()
                .setCustomId('item_name')
                .setLabel('Название товара')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const descriptionInput = new TextInputBuilder()
                .setCustomId('item_description')
                .setLabel('Описание товара')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);

            const priceInput = new TextInputBuilder()
                .setCustomId('item_price')
                .setLabel('Цена товара')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(10);

            // Добавляем поля в модальное окно
            modal.addComponents(
                new MessageActionRow().addComponents(nameInput),
                new MessageActionRow().addComponents(descriptionInput),
                new MessageActionRow().addComponents(priceInput)
            );

            // Отправляем модальное окно
            await interaction.showModal(modal);
        }

        if (interaction.customId === 'add_item_modal') {
            const name = interaction.fields.getTextInputValue('item_name');
            const description = interaction.fields.getTextInputValue('item_description');
            const price = parseInt(interaction.fields.getTextInputValue('item_price'));

            // Вставьте код для сохранения товара в базу данных (например, через Sequelize)
            // В данном примере выводим сообщение
            await interaction.reply(`Товар добавлен: ${name}\nОписание: ${description}\nЦена: ${price} монет`);
        }
    },
};
