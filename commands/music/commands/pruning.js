const fs = require("fs");
const config = require("../config.json");

module.exports = {
  name: "pruning",
  description: "Toggle pruning of bot messages",
  execute(message) {
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("json書き込み時にエラーが発生しました").catch(console.error);
      }

      return message.channel
        .send(`メッセージ自動削除:${config.PRUNING ? "**enabled**" : "**disabled**"}`)
        .catch(console.error);
    });
  }
};
