const { User } = require('../../models/user')
const { getBalance } = require('../../utils/getBalance')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    customId: 'select_coin_shop',  // Уникальный идентификатор для селекта

    /**
     * Обработка выбора из select menu
     *
     * @param {import('discord.js').SelectMenuInteraction} interaction 
     */
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        if (selectedValue === 'bgLevel') {
            await interaction.reply({
                content: 'Вы выбрали товар: Смена фона.',
                ephemeral: true,
            });
        } else if (selectedValue === 'colorRole') {
            await interaction.reply({
                content: 'Вы выбрали товар: Смена цвета ника.',
                ephemeral: true,
            });
        } else if (selectedValue === 'nameChange') {

            const embedError = new EmbedBuilder()
                .setColor('DarkRed')
                .setTitle('Ошибка')
                .addFields({ name: 'Причина:', value: 'Недостаточно средств.' })
                .setFooter({ text: `Вызвано ${interaction.member.id}` })
                .setTimestamp();

                        
            let user_bal = getBalance(interaction.member.id);
                        
                        
            if (user_bal < 50){
                interaction.reply({ embeds: [embedError] });
                return;
            };

            await interaction.reply({
                content: 'Вы выбрали товар: Смена ника.',
                ephemeral: true,
            });
        }
    },
};
