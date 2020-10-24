const { Command } = require('discord-akairo');      //コマンドを読み込み
const util = require('util');                 
const { stripIndents } = require('common-tags');
const { escapeRegex } = require('../../util/Util');
const nl = '!!NL!!';
const nlPattern = new RegExp(nl, 'g');

module.exports = class ExecCommand extends Command {        //コマンドの設定
	constructor() {
		super('exec', {                                         //prefixの後につくコマンド  !ban ←これのこと
			aliases: ['exec', 'execute'],                         //ここにリスト化した文字列だった場合でも動く(つまりこの場合、!execでも!executeでも実行される)
			category: 'owner',                                    //このコマンドのカテゴリー
			description: 'Executes JavaScript code.',             //説明
			ownerOnly: true,                                      //.envに書かれているオーナーしか使えないようにするか<true|false>
			args: [                                               //コマンドの後ろについてる文字列の認識
				{
					id: 'script',
					prompt: {
						start: '実行するコードがありません',                 //コマンドの後ろに文字列がない場合
						retry: '使い方が違います。もう一度試してね！'           //コマンドの後ろの文字列の書式が正しくない場合
					},
					match: 'content',
					type: 'code'
				}
			]
		});

		this.lastResult = null;
	}
                                                              //こっから先はめんどいのでカット(後ろに書かれた文字列を実行するための処理)
                                                              //もともとevalっていう名前で作ってて、一般的？
                                                              //なevalを実装しようとして途中からexecに変えたので、一部evalになっちゃったりしてる
	exec(message, { script }) {
		const { client, lastResult } = this;
		const doReply = val => {
			if (val instanceof Error) {
				message.reply(`Callback error: \`${val}\``);
			} else {
				const result = this.makeResultMessages(val, process.hrtime(this.hrStart));
				if (Array.isArray(result)) {
					for (const item of result) message.reply(item);
				} else {
					message.reply(result);
				}
			}
		};

		let hrDiff;
		try {
			const hrStart = process.hrtime();
			this.lastResult = eval(script.code);
			hrDiff = process.hrtime(hrStart);
		} catch (err) {
			return message.util.reply(`Error while executing: \`${err}\``);
		}

		this.hrStart = process.hrtime();
		return message.util.reply(this.makeResultMessages(this.lastResult, hrDiff, script.code));
	}

	makeResultMessages(result, hrDiff, input = null) {
		const inspected = util.inspect(result, { depth: 0 })
			.replace(nlPattern, '\n')
			.replace(this.sensitivePattern, '--snip--');
		const split = inspected.split('\n');
		const last = inspected.length - 1;
		const prependPart = inspected[0] !== '{' && inspected[0] !== '[' && inspected[0] !== '\'' ? split[0] : inspected[0];
		const appendPart = inspected[last] !== '}' && inspected[last] !== ']' && inspected[last] !== '\''
			? split[split.length - 1]
			: inspected[last];
		const prepend = `\`\`\`javascript\n${prependPart}\n`;
		const append = `\n${appendPart}\n\`\`\``;
		if (input) {
			return discord.splitMessage(stripIndents`
				*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`, { maxLength: 1900, prepend, append });
		} else {
			return discord.splitMessage(stripIndents`
				*Callback executed after ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`, { maxLength: 1900, prepend, append });
		}
	}

	get sensitivePattern() {
		if (!this._sensitivePattern) {
			let pattern = '';
			if (this.client.token) pattern += escapeRegex(this.client.token);
			Object.defineProperty(this, '_sensitivePattern', { value: new RegExp(pattern, 'gi') });
		}
		return this._sensitivePattern;
	}
};
