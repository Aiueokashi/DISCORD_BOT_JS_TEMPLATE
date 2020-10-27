const { Command } = reqiure('discord-akairo');
module.exports = class PrefixCommand extends Command {
	constructor() {
		super('setprefix', {
			aliases: ['sp','prefix','setprefix'],
			category: 'admin',
			description: 'Set bot prefix',
      ownerOnly: true,
      cooldown:2000,
		});
	}
exec(message){
if (prefix === null) prefix = mainprefix;
    if(message.content.startsWith(prefix + 'config')) {
        let args = message.content.split(' ');
      if (!message.member.hasPermission("MANAGE_GUILD")&&!owners.includes(message.author.id))
        return message.channel.send(
          "You need `MANAGE GUILD` to configure the server settings!"
        );
      let content = args[1];
      if (!content) {
        let kk = new Discord.MessageEmbed()
          .setColor(`RANDOM`)
          .setTitle(`${message.guild.name} Settings`)
          .setDescription(`
        \`\`\`${prefix}config [key] [value]\`\`\`
        \`joinMessageChannel\`,\`leaveMessageChannel\`,\`prefix\`,\`show\`,\`reset-invites <@User>\`,\`resetall-invites\`,\`add-invites\``
          )
          .setFooter(message.guild.name, client.user.displayAvatarURL());
       return message.channel.send(kk);
      }
      if (content.toLowerCase() === "prefix") {
        let prefixembed = new Discord.MessageEmbed()
             .setColor(`RANDOM`)
          .setTitle(`**SetPrefix**`)
          .setDescription(
            `This Config is Currently Set.
        Use \`\`\`${prefix}config prefix <value>\`\`\` to change it.
        **Current Value**
        \`\`\`${prefix}\`\`\`
        `
          )
          .setFooter(message.guild.name, client.user.displayAvatarURL());
        let newprefix = args[2];
  
        if (!newprefix) {
          return message.channel.send(prefixembed);
        }
        let changedprefix = new Discord.MessageEmbed()
          .setTitle(`**Prefix Updated**`)
               .setColor(`RANDOM`)
          .setDescription(
            `** Old Value **\n${prefix}\n** New Value **\n${newprefix}`
          )
          .setFooter(message.guild.name, client.user.displayAvatarURL());
        db.delete(`guildprefix_${message.guild.id}`);
        db.set(`guildprefix_${message.guild.id}`, newprefix);
        return message.channel.send(changedprefix);
      }
