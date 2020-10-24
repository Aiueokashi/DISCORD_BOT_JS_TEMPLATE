const { YOUTUBE_API_KEY, MAX_PLAYLIST_SIZE } = process.env;
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = class PlaylistCommand extends Command {
    constructer()
}
