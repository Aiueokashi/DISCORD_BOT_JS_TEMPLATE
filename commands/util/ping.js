const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

module.exports = class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping', 'pong', 'ping-pong'],
			category: 'util',
			description: 'Checks the bot\'s ping ms'
		});
	}

	async exec(message) {
		const retmessage = await message.util.send('Pinging...');
		const ping = Math.round(retmessage.createdTimestamp - message.createdTimestamp);
		return message.edit(stripIndents`
			🏓 P${'o'.repeat(Math.ceil(Math.min(ping / 100, 1800)))}ng! \`${ping}ms\`
			:heart:Heartbeat: \`${Math.round(this.client.ping)}ms\`
		`);
	}
};
