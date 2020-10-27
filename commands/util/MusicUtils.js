module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      member.send("ボイスチャンネルに接続してください").catch(console.error);
      return false;
    }

    return true;
  }
};
