const { canModifyQueue } = require("../util/MusicUtils");
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord-akairo');
module.exports = class LoopCommand extends Command {
	constructor() {
		super('loop', {
			aliases: ['loop', 'l'],
			category: 'music',
			description: 'loop now playing music'
		});
	}
  exec(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("何も再生してないよ").catch(console.error);
    if (!canModifyQueue(message.member)) return;


    queue.loop = !queue.loop;
    return
    let loopEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('LOOP')
    .setDescription(`Looooop:${queue.loop ? "**on**" : "**off**"}`)
    queue.textChannel
      .send(loopEmbed)
      .catch(console.error);
  }
};
