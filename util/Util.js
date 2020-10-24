class Util {										//いろいろな設定
	static shorten(text, maxLen = 2000) {						//送信するtextが2000文字以上だったら1997文字づつに分ける
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

	static trimArray(arr, maxLen = 10) {						//配列が長かったら、後半を短縮する(ここを変えれば、いくらでも表示できるよ)
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	static firstUpperCase(text) {							//英語の一番最初の文字を大文字にする
		return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
	}

	static escapeRegex(str) {							//えっとね、説明めんどe(正規表現の前のバックスラッシュのやつ)
		return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
	}

	static base64(text, mode = 'encode') {						//utf⇄base64でエンコード、デコード
		if (mode === 'encode') return Buffer.from(text).toString('base64');
		if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
		throw new TypeError(`${mode} base64 mode is not supported`);
	}
}

module.exports = Util;
