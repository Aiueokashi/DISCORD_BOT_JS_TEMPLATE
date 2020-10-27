const http = require('http');
http
	.createServer(function(req, res) {
		//httpでwebサイトを作成する。
		res.write('常時起動用'); //uptimerbotで再読み込みさせ続けると
		res.end(); //常時起動できる
	}) //https://uptimerobot.com
	.listen(8080);
const {
	AkairoClient,
	CommandHandler,
	InhibitorHandler,
	ListenerHandler
} = require('discord-akairo');
//discord-akairoというフレームワークを使う。
const { stripIndents } = require('common-tags');
const { OWNERS } = process.env;
const winston = require('winston');
const path = require('path');
const CodeType = require('../types/code');
class Client extends AkairoClient {
	//クライアントの設定
	constructor() {
		super({
			ownerID: OWNERS
		});
		this.commandHandler = new CommandHandler(this, {
			//コマンドハンドラの設定(これがデフォルトになる。後でコマンド単位で設定可能)
			directory: './commands/', //コマンドが入ってるファイルの場所(これだと、commands/コマンドのjsファイル)になる
			blockBots: true, //botから送信されたメッセージをブロックするか<true|false>
			blockClient: true, //このbotから送信されたメッセージをブロックするか<true|false>
			allowMention: true, //prefixの代わりにbotをメンションしてもコマンドを実行するか<true|false>
			handleEdits: true, //編集されたメッセージがコマンドだった場合に反応するか<true|false>
			commandUtil: true, //説明めんどe
			commandUtilLifetime: 60000, //e
			fetchMembers: true, //各メッセージごとにメンバーを読み込むかどうか<true|false>
			defaultCooldown: 1000 //一度コマンドが使用されてから、もう一度使えるようになるまで<ミリ秒>
		});

		this.inhibitorHandler = new InhibitorHandler(this, {
			//インハイビターハンドラの設定
			directory: './inhibitors/'
		});

		this.listenerHandler = new ListenerHandler(this, {
			//リスナーハンドラの設定
			directory: '../listeners/'
		});
	}

	setup() {
		this.commandHandler.loadAll();
		this.commandHandler.resolver.addType('code', CodeType);
	}
}
module.exports = Client;
