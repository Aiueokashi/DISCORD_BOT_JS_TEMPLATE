[replit]:https://repl.it<br>
[djs]:https://discord.js.org/#/<br>
[akairo]:https://discord-akairo.github.io/#/
[![Run on Repl.it](https://repl.it/badge/github/Aiueokashi/DISCORD_BOT_JS_TEMPLATE)](https://repl.it/github/Aiueokashi/DISCORD_BOT_JS_TEMPLATE)
![MyBadge](https://img.shields.io/badge/まだ-制作途中-orange)
# DISCORD_BOT_JS_TEMPLATE:warning:制作途中！！！
## [repl.it][replit]で動かすためのコードです！
## なんかreplの不具合かわからんけどCloneが使えないのでZip推奨
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
- [x] MusicPlayer
- [ ] ReactionMusicPlayer
- [ ] UtilityCommands
- [ ] ModerationCommands
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
| 誰でも使えるコマンド | 説明 | 短縮コマンド |
| --- | --- | --- |
|ping|典型的なあれ(ping値を測定)かかった時間に応じて'pong'の'o'の数が増える|pong,<br>ping-pong|
| play \<曲の名前\|URL> | 再生 | p | 
| playlist <プレイリストの名前\|プレイリストのURL> | プレイリストの再生 | pl |
| pause | 一時停止　| pa |
| pruning <true\|false>| 再生が終わったら、botのメッセージを順次削除　| pr |
| stop | 曲の再生を停止し、キューから全ての曲を削除|　なし　|
| skip | 再生中の曲をスキップ | s |
| skipto \<value>| キューの番号を指定して、その曲までスキップ| st |
| search \<検索ワード>| youtube検索をかける(10個まで表示されて、番号を選択すると再生)|なし|
| shuffle | キューをシャッフル| なし|
| volume \<value>| 指定した数値に音量を変える|v|
|loop|再生中の曲をループ|l|
|lyrics|再生中の曲の歌詞を検索|ly|
|queue|キューを表示|q|
|nowplaying|再生中の曲の詳細を表示|np|
|remove \<value>|指定したキューの番号の曲をキューから外す|なし|
|resume|pauseで止めた再生を再開|r|
|他にもあるんだけど|ちょっと今日はここまで|...|
  
|botオーナー用コマンド|説明|短縮|
|---|---|---|
|evaluate \<code>|codeの中身が実際に実行される。<br>:warning:サーバーやプログラムに変更が加えられる:warning:<br>(動くのは[Discord.js][djs]と[discord-akairo][akairo]書式のみ)|eval|
|execute \<code>|codeの中身を実行する(evalとは違って結果が文字、数値として返ってくるだけ)|exec|
  
  
### READMEって書くのめんどくさいね...楽しいけど

# 不具合とかどうたらこうたら↓
ちょっと待っててね..<br>あ、そうそう、作りかけのコードが挟まってることが多いので注意！


