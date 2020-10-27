const { canModifyQueue } = require("../util/MusicUtils");
const { Command } = require('discord-akairo');
module.exports = class SkipCommand extends Command {
	constructor() {
		super('skip', {
			aliases: ['skip', 's'],
			category: 'music',
			description: 'skip music now playing'
		});
	}
  exec(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("スキップできる曲がないよ").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ スキップしたよ`).catch(console.error);
  }
};
