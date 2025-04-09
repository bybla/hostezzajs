const fs = require('fs');
const path = require('path');
const { Events, Collection, MessageFlags } = require('discord.js');

const buttons = new Collection();
const selects = new Collection();  // Коллекция для select menu
const modals = new Collection();   // Коллекция для модальных окон

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            // 🔹 Slash-команды
            if (interaction.isChatInputCommand()) {
                const command = interaction.client.commands.get(interaction.commandName);

                if (!command) {
                    console.error(`❌ No command matching ${interaction.commandName} was found.`);
                    return;
                }

                await command.execute(interaction);
            }

            // 🔹 Кнопки
            else if (interaction.isButton()) {
                // Кэшируем кнопки при первом вызове
                if (buttons.size === 0) {
                    const buttonsPath = path.join(__dirname, '../interactions/buttons');
                    const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

                    for (const file of buttonFiles) {
                        const button = require(`${buttonsPath}/${file}`);
                        if (button.customId && typeof button.execute === 'function') {
                            buttons.set(button.customId, button);
                        }
                    }
                }

                const button = buttons.get(interaction.customId);
                if (!button) return;

                await button.execute(interaction);
            }

            // 🔹 Select Menu
            else if (interaction.isStringSelectMenu()) {
                // Кэшируем select menu при первом вызове
                if (selects.size === 0) {
                    const selectsPath = path.join(__dirname, '../interactions/selects');
                    const selectFiles = fs.readdirSync(selectsPath).filter(file => file.endsWith('.js'));

                    for (const file of selectFiles) {
                        const select = require(`${selectsPath}/${file}`);
                        if (select.customId && typeof select.execute === 'function') {
                            selects.set(select.customId, select);
                        }
                    }
                }

                const select = selects.get(interaction.customId);
                if (!select) return;

                await select.execute(interaction);
            }

            // 🔹 Модальные окна
            else if (interaction.isModalSubmit()) {
                // Кэшируем модалки при первом вызове
                if (modals.size === 0) {
                    const modalsPath = path.join(__dirname, '../interactions/modals');
                    const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));

                    for (const file of modalFiles) {
                        const modal = require(`${modalsPath}/${file}`);
                        if (modal.customId && typeof modal.execute === 'function') {
                            modals.set(modal.customId, modal);
                        }
                    }
                }

                const modal = modals.get(interaction.customId);
                if (!modal) return;

                await modal.execute(interaction);
            }

        } catch (error) {
            console.error(`❌ Ошибка при обработке интеракции:`, error);

            const content = '⚠️ Произошла ошибка при выполнении команды!';
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content, flags: MessageFlags.Ephemeral });
            } else {
                await interaction.reply({ content, flags: MessageFlags.Ephemeral });
            }
        }
    },
};
