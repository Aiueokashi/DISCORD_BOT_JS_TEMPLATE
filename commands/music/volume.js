const { canModifyQueue } = require("../util/MusicUtills");

module.exports = class VolumeCommand extends Command {
	constructor() {
		super('volume', {
			aliases: ['volume', 'v'],
			category: 'music',
			description: 'switch volume'
		});
	}
  exec(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("何も再生してないよ").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("ボイチャに接続してね").catch(console.error);

    if (!args[0]) return message.reply(`🔊 今のボリューム: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("数字を入力してね").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("0 - 100の間でお願いします...").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`ボリューム: **${args[0]}%**`).catch(console.error);
  }
};
