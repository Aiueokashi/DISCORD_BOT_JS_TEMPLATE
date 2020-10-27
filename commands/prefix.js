const { Command } = require('discord-akairo');
const { OWNERS } = process.env
const owners = OWNERS
const db = require('quick.db');	
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = class PrefixCommand extends Command {
	constructor() {
		super('config', {
			aliases: ['config','c'],
			category: 'admin',
			description: 'Set bot prefix',
      ownerOnly: true,
      cooldown:2000,
		});
	}
exec(message){
if (prefix === null) prefix = mainprefix;
    if(message.content.startsWith(prefix + 'config')||message.content.startsWith(prefix + 'c')) {
        let args = message.content.split(' ');
      if (!message.member.hasPermission("MANAGE_GUILD")&&!owners.includes(message.author.id))
        return message.channel.send(
          "MANAGE_GUILD premissionが必要です"
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
            `使用方法:
         \`\`\`${prefix}config prefix <value>\`\`\` 
        **現在のprefix**
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
            `** 前のprefix **\n${prefix}\n** 今のprefix **\n${newprefix}`
          )
          .setFooter(message.guild.name, client.user.displayAvatarURL());
        db.delete(`guildprefix_${message.guild.id}`);
        db.set(`guildprefix_${message.guild.id}`, newprefix);
        return message.channel.send(changedprefix);
      }if (content.toLowerCase() === "joinmessagechannel") {
        let joinchannelmessagedata = db.get(
          `joinchannelmessage_${message.guild.id}`
        );
        if (joinchannelmessagedata === null) joinchannelmessagedata = "none";
        let joinchannel = message.mentions.channels.first();
        let joinchannelmessage = new Discord.MessageEmbed()
          .setTitle(`** 入室ログチャンネル **`)
          .setColor(`RANDOM`)
          .setDescription(
            `使用方法:
           \`\`\`${prefix}config joinMessageChannel #channel\`\`\` 
          **現在の設定**
          <#${joinchannelmessagedata}>
          `
          )
          .setFooter(message.guild.name, client.user.displayAvatarURL());
        if (!joinchannel) {
          return message.channel.send(joinchannelmessage);
        }
        const joinmessageupdated = new Discord.MessageEmbed()
          .setTitle(`**入室ログ　変更**`)
          .setColor(`RANDOM`)
          .setDescription(
            `** 前の入室ログチャンネル **\n<#${joinchannelmessagedata}>\n** 今の入室ログチャンネル **\n<#${joinchannel.id}>`
          )
          .setFooter(message.guild.name, client.user.displayAvatarURL());
        db.delete(`joinchannelmessage_${message.guild.id}`);
        db.set(`joinchannelmessage_${message.guild.id}`, joinchannel.id);
        return message.channel.send(joinmessageupdated);
      }
      if (content.toLowerCase() === "leavemessagechannel") {
        let leavechanneldata = db.get(`leavechannelmessage_${message.guild.id}`);
        if (leavechanneldata === null) leavechanneldata = "none";
  
        let leavechannel = message.mentions.channels.first();
        let leavemessageembed = new Discord.MessageEmbed()
          .setTitle(`** 退出ログ表示チャンネル **`)
           .setColor(`RANDOM`)
          .setDescription(
            `使用方法:
          \`\`\`${prefix}config LeaveMessageChannel #channel\`\`\` 
          **現在の設定**
          <#${leavechanneldata}>
          `
          )
          .setFooter(message.guild.name, client.user.displayAvatarURL());
        if (!leavechannel) {
          return message.channel.send(leavemessageembed);
        }
        const leavemessageupdated = new Discord.MessageEmbed()
          .setTitle(`**退出ログ 変更**`)
             .setColor(`RANDOM`)
          .setDescription(
            `** 前の退出ログチャンネル **\n<#${leavechanneldata}>\n** 今の退出ログチャンネル **\n<#${leavechanneldata.id}>`
          )
          .setFooter(message.guild.name, client.user.displayAvatarURL());
        db.delete(`leavechannelmessage_${message.guild.id}`);
        db.set(`leavechannelmessage_${message.guild.id}`, leavechannel.id);
        return message.channel.send(leavemessageupdated);
      }
      if (content.toLowerCase() === "show") {
        let joinmessage = db.get(`joinmessage_${message.guild.id}`);
        if (joinmessage === null) joinmessage = defaultjoinmessage;
        let leavemessage = db.get(`leavemessage_${message.guild.id}`);
        if (leavemessage === null) leavemessage = defaultleavemessage;
        let joinchannelmessage = db.get(`joinchannelmessage_${message.guild.id}`);
        let joinchannelmessage2 = db.get(
          `joinchannelmessage_${message.guild.id}`
        );
        if (joinchannelmessage === null) joinchannelmessage = "未設定";
        else joinchannelmessage = `<#${joinchannelmessage2}>`;
        let leavechannelmessage = db.get(
          `leavechannelmessage_${message.guild.id}`
        );
        let leavechannelmessage2 = db.get(
          `leavechannelmessage_${message.guild.id}`
        );
        if (leavechannelmessage === null) leavechannelmessage = "未設定";
        else leavechannelmessage = `<#${leavechannelmessage2}>`;
        let guildconfig = new Discord.MessageEmbed()
          .setAuthor(
            `${message.guild.name} 現在の設定`,
            message.author.displayAvatarURL()
          )
             .setColor(`RANDOM`)
          .addField(`Prefix`, `\`${prefix}\``, true)
          .addField(`JoinMessage`, `\`${joinmessage}\``, true)
          .addField(`LeaveMessage`, `\`${leavemessage}\``, true)
          .addField(`JoinChannel`, `${joinchannelmessage}`, true)
          .addField(`LeaveChannel`, `${leavechannelmessage}`, true)
          .setFooter(client.user.username, client.user.displayAvatarURL());
       
        return message.channel.send(guildconfig);
      }
    }
};
