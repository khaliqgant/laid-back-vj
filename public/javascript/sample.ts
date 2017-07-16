/**
 * On YouTubeIframeAPIReady
 * @desc
 * bind to the window to make sure it is evoked globally
 * @see https://stackoverflow.com/questions/12256382/youtube-iframe-api-not-triggering-onyoutubeiframeapiready
 */
window.onYouTubeIframeAPIReady = function() {
    let player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: window.id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    //event.target.loadPlaylist(
        //window.ids
    //);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    //player.stopVideo();
}
