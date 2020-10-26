const { canModifyQueue } = require("../util/MusicUtils");

module.exports = class ResumeCommand extends Command {
	constructor() {
		super('resume', {
			aliases: ['resume', 'r'],
			category: 'music',
			description: 'resume music'
		});
	}
  exec(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("プレイしてるものがありません").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ 再開`).catch(console.error);
    }

    return message.reply("もともと、とまってないけど..?").catch(console.error);
  }
};
