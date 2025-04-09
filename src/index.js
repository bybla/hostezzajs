const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { prefix } = require('./config.json');
const sequelize = require('./utils/database'); 
const User = require('./models/user')
 
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Collection();

// Функция для рекурсивного поиска файлов
async function loadFiles(dirPath, fileCallback) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            await loadFiles(fullPath, fileCallback);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            await fileCallback(fullPath);
        }
    }
}

(async () => {
    try {

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }

        sequelize.sync({ alter: false, force: false })  // Если база данных уже существует, alter автоматически обновит структуру
        .then(() => {
            console.log('[INFO] Database synchronized successfully');
        })
        .catch((error) => {
            console.error('[ERROR] Error synchronizing database:', error);
        });
            
        await User.sync()
        await User.sync({ alter: true })
        // Загрузка команд
        await loadFiles(path.join(__dirname, 'commands'), async (filePath) => {
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                console.log(`[SUCCESS] Command ${command.data.name} loaded`);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing required properties`);
            }
        });

        console.log('[INFO] All commands loaded successfully');

        // Загрузка событий
        await loadFiles(path.join(__dirname, 'events'), async (filePath) => {
            const event = require(filePath);

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }

            console.log(`[SUCCESS] Event ${event.name} loaded`);
        });

        console.log('[INFO] All events loaded successfully');

        // Загрузка префиксных команд
        await loadFiles(path.join(__dirname, 'commands/prefix'), async (filePath) => {
            const event = require(filePath);

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }

            console.log(`[SUCCESS] Prefix command from ${filePath} loaded`);
        });

        console.log('[INFO] All prefix commands loaded successfully');

        // Логинимся в Discord
        await client.login(process.env.TOKEN);
        console.log('[INFO] Bot logged in successfully');

    } catch (error) {
        console.error('[ERROR] Error during startup:', error);
    }
})();
