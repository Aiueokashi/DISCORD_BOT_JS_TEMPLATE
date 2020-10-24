const { Inhibitor } = require('discord-akairo');   //inhibitorHandlerを読み込む

class BlacklistInhibitor extends Inhibitor {       //class作成
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    exec(message) {

        const blacklist = [''];                     //ここの中に、ブラックリストのid配列
        return blacklist.includes(message.author.id);
    }
}

module.exports = BlacklistInhibitor;
