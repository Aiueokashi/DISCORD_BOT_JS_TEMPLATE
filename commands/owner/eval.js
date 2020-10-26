const { Command } = require('discord-akairo');
const { inspect } = require('util');
const { stripIndents } = require('common-tags');
const discord = reqire('discord.js');
const path = require('path');
client = new discord.Client()
module.exports = class EvalCommand extends Command {
	constructor() {
		super('eval', {
			aliases: ['eval','evaluate'],
			category: 'admin',
			description: 'An evaluate command',
      ownerOnly: true,
      typing:true,
      cooldown:2000,
		});
	}
async exec(message) {
  const prefix = process.env.AUTO_PREFIX
  const args = message.content.slice(prefix.length+4).split(' ')
		let evaled;
		var sourceStr = message.content;
		var code = sourceStr.slice(prefix.length+4);
		try {
			evaled = await eval(args.join(' '));
			message.react('✅');
			console.log(inspect(evaled));
		} catch (error) {
			console.error(error);
			var errormsg = msg.channel.send({
				embed: {
					color: 0x00ae86,
					title: ':warning:error',
					description: 'code:```' + code + '```error:```' + error + '```'
				}
			});
			message.react('❎');
		}
}
};
