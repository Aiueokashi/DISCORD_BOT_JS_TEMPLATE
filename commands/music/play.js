const { YOUTUBE_API_KEY } = process.env;
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = class PlayCommand extends Command {
	constructor() {
		super('play', {
			aliases: ['play', 'p'],
			category: 'music',
			description: 'play music from youtube'
		});
	}
  
 async exec(message, args) {
    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel) return message.reply("ボイチャに接続してね").catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.reply(`${message.client.user}と同じボイスチャンネル内にいてね`).catch(console.error);

    if (!args.length)
      return message
        .reply(`コマンド: ${message.client.prefix}play <YouTube URL | Video Name >`)
        .catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);


    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1);
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        return message.reply("検索結果0件").catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      let addembed = new MessageEmbed()
      .setTitle('曲追加')
      .setDescription(`✅ **${song.title}** を<@!${message.author.id}>が追加したよ`)
      return serverQueue.textChannel
        .send(addembed)
        .catch(console.error);
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);

    try {
      queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(`ボイスチャンネルに接続できません: ${error}`).catch(console.error);
    }
  }
  
};
