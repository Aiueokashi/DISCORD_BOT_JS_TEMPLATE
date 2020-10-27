const { canModifyQueue } = require("../util/MusicUtils");
const { Command } = require('discord-akairo');

module.exports = class StopCommand extends Command{
	constructor() {
		super('stop', {
			aliases: ['stop'],
			category: 'music',
			description: 'stop music playing'
		});
	}
  exec(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("何も再生してないよ").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ 停止`).catch(console.error);
  }
};
