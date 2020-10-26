const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

module.exports = class PlayCommand extends Command {
	constructor() {
		super('nowplaying', {
			aliases: ['nowplaying', 'np'],
			category: 'music',
			description: 'show details of playing music'
		});
	} 
  exec(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("何も再生してないよ").catch(console.error);
    const song = queue.songs[0];
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = song.duration - seek;

    let nowPlaying = new MessageEmbed()
      .setTitle("Now playing")
      .setDescription(`${song.title}\n${song.url}`)
      .setColor("RANDOM")
      .setAuthor(message.author.tag)
      .addField(
        "\u200b",
        new Date(seek * 1000).toISOString().substr(11, 8) +
          "[" +
          createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
          "]" +
          (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
        false
      );

    if (song.duration > 0)
      nowPlaying.setFooter("残プレイ時間: " + new Date(left * 1000).toISOString().substr(11, 8));

    return message.channel.send(nowPlaying);
  }
};
