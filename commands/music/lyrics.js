const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const { Command } = require('discord-akairo');
module.exports = class LyricsCommand extends Command {
	constructor() {
		super('lyrics', {
			aliases: ['lyrics', 'ly'],
			category: 'music',
			description: 'search lyrics from youtube'
		});
	}
async exec(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("何も再生してないよ").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `歌詞が見つからなかったよ: ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `歌詞が見つからなかったよ: ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle("Lyrics")
      .setDescription(lyrics)
      .setColor("RANDOM")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
