const { Events, Client } = require('discord.js');
const addAllServerUsers = require('../utils/allServerSync');

module.exports = {
	name: Events.ClientReady,
	once: true,
	/**
     * Description placeholder
     *
     * @async
     * @param {Client} client 
     * @returns {*} 
     */
    async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};