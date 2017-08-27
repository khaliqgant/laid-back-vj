/// <reference path='../../typings/tsd.d.ts'/>

declare var require: NodeRequire;

// KJG how would i use this interface?
//import {User} from './Lastfm';
//const User = require('../../interfaces/Lastfm');
//console.log(User);
const request = require('browser-request');

interface Window {
    id: string;
    userId: string;
    videos: string[];
    onYouTubeIframeAPIReady: Function;
    YT: any;
}

/**
 * On YouTubeIframeAPIReady
 * @desc
 * bind to the window to make sure it is evoked globally
 * @see https://stackoverflow.com/questions/12256382/youtube-iframe-api-not-triggering-onyoutubeiframeapiready
 */
window.onYouTubeIframeAPIReady = function() {
    let player = new window.YT.Player('player', {
        height: '390',
        width: '640',
        videoId: window.id !== '' ? window.id : 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event: any) {
    event.target.loadPlaylist(window.videos);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event: any) {
    if (event.data == window.YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    //player.stopVideo();
}

request('/api/lastfm/user/' + window.userId, function (err: any, response: any, body: any){
    const userInfo = JSON.parse(body);
    const picture = userInfo.image[1]['#text'];
    const playcount: string = userInfo.playcount;
});
// make async request for user info
// http://www.last.fm/api/show/user.getInfo
// show their friends too
// http://www.last.fm/api/show/user.getFriends
