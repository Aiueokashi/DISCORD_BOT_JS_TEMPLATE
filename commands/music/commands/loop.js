const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Toggle music loop",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("何も再生してないよ").catch(console.error);
    if (!canModifyQueue(message.member)) return;


    queue.loop = !queue.loop;
    return
    let loopEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('LOOP')
    .setDescription(`Looooop:${queue.loop ? "**on**" : "**off**"}`)
    queue.textChannel
      .send(loopEmbed)
      .catch(console.error);
  }
};