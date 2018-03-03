// KJG how would i use this interface?
// import {User} from './Lastfm';
// const User = require('../../interfaces/Lastfm');
const LastFmApi = require('./lastfm');

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
window.onYouTubeIframeAPIReady = () => {

  const player = new window.YT.Player('player', {
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    height: '390',
    videoId: window.id !== '' ? window.id : 'M7lc1UVf-VE',
    width: '640',
  });

};

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event: any) {

  event.target.loadPlaylist(window.videos);

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;

function onPlayerStateChange(event: any) {

  if (event.data === window.YT.PlayerState.PLAYING && !done) {

    setTimeout(stopVideo, 6000);
    done = true;

  }

}
function stopVideo() {
  // player.stopVideo();
}

if (Object.prototype.hasOwnProperty.call(window, 'userId') &&
    window.userId.length) {

  LastFmApi.user(window.userId).then((userInfo: any) => {

    const picture = userInfo.image[1]['#text'];
    const playcount: string = userInfo.playcount;

  });

  LastFmApi.friends(window.userId).then((userInfo: any) => {

    const picture = userInfo.image[1]['#text'];
    const playcount: string = userInfo.playcount;

  });

}
