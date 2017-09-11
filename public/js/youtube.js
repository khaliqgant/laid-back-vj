// KJG how would i use this interface?
//import {User} from './Lastfm';
//const User = require('../../interfaces/Lastfm');
var request = require('browser-request');
/**
 * On YouTubeIframeAPIReady
 * @desc
 * bind to the window to make sure it is evoked globally
 * @see https://stackoverflow.com/questions/12256382/youtube-iframe-api-not-triggering-onyoutubeiframeapiready
 */
window.onYouTubeIframeAPIReady = function () {
    var player = new window.YT.Player('player', {
        height: '390',
        width: '640',
        videoId: window.id !== '' ? window.id : 'M7lc1UVf-VE',
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
};
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.loadPlaylist(window.videos);
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == window.YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    //player.stopVideo();
}
if (window.userId.length) {
    /**
     *
     * Last FM User
     * @desc grab the last fm user info and display
     *
     */
    request('/api/lastfm/user/' + window.userId, function (err, response, body) {
        var userInfo = JSON.parse(body);
        var picture = userInfo.image[1]['#text'];
        var playcount = userInfo.playcount;
    });
    /**
     *
     * Last FM User's Friends
     * @desc grab the last fm user's friends
     *
     */
    request('/api/lastfm/friends/' + window.userId, function (err, response, body) {
        var userInfo = JSON.parse(body);
    });
}
