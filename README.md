[replit]:https://repl.it
# DISCORD_BOT_JS_TEMPLATE:warning:制作途中！！！
[TOC]
## [repl.it][replit]で動かすためのコードです！
discord-akairoでbotを書こうかなと<br>
気ままに書くので何を追加するかもよくわからない🤪<br>
repl.itで動かすように書いてます.<br>
極力コメントアウトするつもり...以上<br>
追記 englishあんまわかんないので、エラー表示の文法とか間違ってるかも(動くから気にしないで....)<br>
追記10/24 とりあえず音楽再生<br>
~~追記10/25　youtube-dl使えなくなったっぽい....死ゾ....~~ <br>
追記10/26 いや、なんか普通に使えた。youtubeのシステムじゃなくてパッケージが停止されただけなのか:thinking:
.<br>
日本語版InviteManager作るか...
<br><br>
# 機能↓
- [x] 音楽再生<br>
- [ ] InviteTracker/Manager
- [ ] LevelingSystem
<br><br>

# コマンドとか使い方とか
## A.使い方
`.env`ファイルと`config.yaml`の中に書いてある項目を埋めれば使えます。<br><br>
.envに必要なもの:<br>
①DiscordのBotToken<br>
②オーナーの(あなたの)discordのID(2人以上の時はカンマ(,)で区切ってね)<br>
②YoutubeのAPI Key<br><br>
config.yamlに書くもの:<br>
①デフォルトのprefix(コマンドでサーバーごとに変更可能)<br>
②デフォルトのwelcome/leaveメッセージ(コマンドでサーバーごとに変更、オンオフ可能)<br>
いじょー<br><br>
## B.コマンド
指定した`prefix`をコマンドの前につけるか、botをメンションした後にコマンドを打つとbotが反応します。<br>
間違えてスペルミスなどをした場合は、編集して正しいコマンドに直せば実行されます。<br>
表には引数をわかりやすくするため、「<>」がついていますが、実際に使用する時は外してください
| コマンド | 説明 | 短縮コマンド |
| --- | --- | --- |
| play <曲の名前\|URL> | 再生 | p | 
| playlist <プレイリストの名前\|プレイリストのURL> | プレイリストの再生 | pl |
|他にもあるんだけど|ちょっと今日はここまで|...|
### READMEって書くのめんどくさいね...

# 不具合とかどうたらこうたら↓
ちょっと待っててね..<br>あ、そうそう、作りかけのコードが挟まってることが多いので注意！
