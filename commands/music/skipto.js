const { canModifyQueue } = require("../util/MusicUtils");

module.exports = class SkipToCommand extends Command {
	constructor() {
		super('skipto', {
			aliases: ['skipto', 'st'],
			category: 'music',
			description: 'skip to number of queue'
		});
	}
  exec(message, args) {
    if (!args.length)
      return message
        .reply(`コマンド: ${message.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    if (isNaN(args[0]))
      return message
        .reply(`コマンド: ${message.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("キューがないよ").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (args[0] > queue.songs.length)
      return message.reply(` ${queue.songs.length}曲しかキューにないのでスキップできないよ`).catch(console.error);

    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ ${args[0] - 1} 曲スキップしたよ`).catch(console.error);
  }
};
