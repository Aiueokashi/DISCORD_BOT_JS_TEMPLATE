require('dotenv').config();
const { DISCORD_BOT_TOKEN, OWNERS } = process.env;                            //.envファイルからトークン、プレフィックス、オーナーIDをとってくる
const Client = require('./structures/Client');                                        //discordのクライアント
//const activities = require('./assets/json/activity');					//プレイ中の表示を変える場合、それを読み込む
const fs = require('fs');								//fsというyaml書き込みのためのパッケージ
const db = require('quick.db');								//replでも動くデーターベースのパッケージ
const yaml = require("js-yaml");							//.yamlファイルを使えるようにする(デフォルト値設定のため)
const { mainprefix } = yaml.load(fs.readFileSync("./config.yml"));			//デフォルトのprefixを指定
const client = new Client({                                                           //クライアントの設定
	prefix: mainprefix,db.get(`guildprefix_${message.guild.id}`),
	ownerID: OWNERS.split(','),                                                   //ownerIDをとってくる  例→  12345667887,123435453342
	disableEveryone: true                                                         //botが@everyoneを使えないようにする
});
const codeblock = /```(?:(\S+)\n)?\s*([^]+?)\s*```/i;                                  //コードブロックの書式読み込み
const { stripIndents } = require('common-tags');
const runLint = message => {                                                           //コマンドを使用するための設定
	if (message.channel.type !== 'text' || message.author.bot) return null;        //メッセージの送信場所がテキストチャンネル以外の時、送信者がbotだった時無視
	if (!codeblock.test(message.content)) return null;  
	if (!message.channel.permissionsFor(message.client.user).has(['ADD_REACTIONS', 'READ_MESSAGE_HISTORY'])) return null;//このbotの権限が足りない時無視
	const parsed = codeblock.exec(message.content);　
	const code = {
		code: parsed[2],
		lang: parsed[1] ? parsed[1].toLowerCase() : null
	};
	return client.commandHandler.modules.get('lint').exec(message, { code, amber: false }, true); 
	                                                                                //上記の条件を満たしたメッセージだった場合にcommandHandlerを呼び出してメッセージに対し処理を行う
};

client.setup();//setup

client.on('ready', () => {								//ログインしたときのイベント
	console.log(` Logged in ${client.user.tag} ID: ${client.user.id}`);
	/*client.setInterval(() => {							//プレイ中の表示を変えたい場合これを使う
		const activity = activities[Math.floor(Math.random() * activities.length)];
		client.user.setActivity(activity.text, { type: activity.type });
	}, 15000);*/
	 client.guilds.cache.forEach(guild => {						//guild内でオフラインの間に作られた招待リンクを検知する
		 guild
			 .fetchInvites()
			 .then(invites => guildInvites.set(guild.id, invites))		//invitesをセット
			 .catch(err => console.log(err));
	 });
});

client.on("inviteCreate", async invite =>						//guild内で招待リンクが作られた際にそれを検知するイベント
	  guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
);

const { defaultjoinmessage, defaultleavemessage } = yaml.load(				//yamlファイルからデフォルトのメッセージを取ってくる
	fs.readFileSync("./config.yml")
);

client.on("guildMemberAdd", async member => {						//guildに新しいmemberが入ったときの処理
  let joinchannelmessage = db.get(`joinchannelmessage_${member.guild.id}`);
  if (!joinchannelmessage === null) {
    return console.log(`None`);
  }
  let joinmessage = db.get(`joinchannelmessage_${member.guild.id}`);
  if (joinmessage === null) joinmessage = defaultjoinmessage;

  const catchedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
    const usedInvite = newInvites.find(
      inv => catchedInvites.get(inv.code).uses < inv.uses
    );
    db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}`, 1);
    db.set(`inviter_${member.id}`, usedInvite.inviter.id);
    let inv = db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}`);
    let joinmessage2 = defaultjoinmessage
      .toLowerCase()
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv);


    db.add(`jointimes_${member.guild.id}_${member.id}`, 1);
    db.add(`Regular_${member.guild.id}_${usedInvite.inviter.id}`, 1);
    client.channels.cache.get(joinchannelmessage).send(joinmessage2);
  } catch (err) {
    console.log(err);
  }
});

client.on("guildMemberRemove", member => {
  let leavechannel = db.get(`leavechannelmessage_${member.guild.id}`);
  if (leavechannel === null) {
    return console.log(`nope!`);
  }
  let leavemssage = db.get(`leavemessage_${member.guild.id}`);
  if (leavemssage === null) leavemssage = defaultleavemessage;

  let inviter2 = db.fetch(`inviter_${member.id}`);
  const iv2 = client.users.cache.get(inviter2);
  const mi = member.guild.members.cache.get(inviter2);
  db.subtract(`invites_${member.guild.id}_${inviter2}`, 1);
  if (!inviter2) {
    client.channels.cache
      .get(leavechannel)
      .send(`${member.tag} が退出したけど誰が招待したのか分からなかったよ`);
    return;
  }
  let leavemssage2 = leavemssage
    .toLowerCase()
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`);

  db.add(`leaves_${member.guild.id}_${inviter2}`, 1);
  client.channels.cache.get(leavechannel).send(leavemssage2);
});

client.on('disconnect', event => {
	console.log(`[DISCONNECT] Disconnected with code ${event.code}.`);
	process.exit(0);
});

client.on('message', message => runLint(message));                                       //メッセージを受信したときにrunLint(さっきのあれ(語彙力))をじっこうする

client.on('messageUpdate', (oldMessage, message) => runLint(message));　                  //メッセージが編集されたときに(上に同じ)

client.on('error', err => console.log(err));                                       //エラーが起きた時

client.on('warn', warn => console.log(warn));                                       //警告

client.commandHandler.on('error', (err, message, command) => {                             //コマンドの実行中に予期しないエラーが発生したときにそのチャンネルにエラー内容を送信する
	console.log(`[COMMAND${command ? `:${command.name}` : ''}]\n${err.stack}`);
	message.reply(stripIndents`
		コマンドを実行中にエラーが発生しました: \`${err.message}\`コマンドを終了します`).catch(() => null);
});

client.login(DISCORD_BOT_TOKEN);                                                            //botにログイン
