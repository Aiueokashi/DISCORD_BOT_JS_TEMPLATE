const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");

module.exports = class PlayCommand extends Command {
	constructor() {
		super('queue', {
			aliases: ['queue', 'q'],
			category: 'music',
			description: 'show queue'
		});
	}
  exec(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("何もプレイしていないよ").catch(console.error);

    const description = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);

    let queueEmbed = new MessageEmbed()
      .setTitle("キュー")
      .setDescription(description)
      .setColor("RANDOM");

    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: ""
    });

    splitDescription.forEach(async (m) => {
      queueEmbed.setDescription(m);
      message.channel.send(queueEmbed);
    });
  }
};
