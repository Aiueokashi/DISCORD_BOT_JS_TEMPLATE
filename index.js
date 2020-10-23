require('dotenv').config();
const { DISCORD_BOT_TOKEN, PREFIX, OWNERS } = process.env;                            //.envファイルからトークン、プレフィックス、オーナーIDをとってくる
const Client = require('./structures/Client');                                        //discordのクライアント
const client = new Client({                                                           //クライアントの設定
	prefix: PREFIX.split('\\'),                                                   //prefixをとってくる 例→　#\\!\\?  と書けば#と!と？が使える
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

client.on('message', message => runLint(message));                                       //メッセージを受信したときにrunLint(さっきのあれ(語彙力))をじっこうする

client.on('messageUpdate', (oldMessage, message) => runLint(message));　                  //メッセージが編集されたときに(上に同じ)

client.on('error', err => client.logger.error(err));                                       //エラーが起きた時

client.on('warn', warn => client.logger.warn(warn));                                       //警告

client.commandHandler.on('error', (err, message, command) => {                             //コマンドの実行中にエラーが発生したときにそのチャンネルにエラー内容を送信する
	client.logger.error(`[COMMAND${command ? `:${command.name}` : ''}]\n${err.stack}`);
	message.reply(stripIndents`
		コマンドを実行中にエラーが発生しました: \`${err.message}\`コマンドを終了します`).catch(() => null);
});

client.login(DISCORD_BOT_TOKEN);                                                            //botにログイン
