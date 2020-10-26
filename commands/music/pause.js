const { canModifyQueue } = require("../util/MusicUtils");

module.exports = class PauseCommand extends Command {
	constructor() {
		super('pause', {
			aliases: ['pause', 'pa'],
			category: 'music',
			description: 'pause music'
		});
	}
  exec(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("何もプレイしてないよ").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ ポーズ中`).catch(console.error);
    }
  }
};
