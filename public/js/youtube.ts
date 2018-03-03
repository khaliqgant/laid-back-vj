// KJG how would i use this interface?
// import {User} from './Lastfm';
// const User = require('../../interfaces/Lastfm');
const request = require('browser-request');

interface Window {
    id: string;
    userId: string;
    videos: string[];
    onYouTubeIframeAPIReady: Function;
    onPlayerReady: Function;
    onPlayerStateChange: Function;
    YT: any;
}

// 4. The API will call this function when the video player is ready.
window.onPlayerReady = (event: any) => {

  event.target.loadPlaylist(window.videos);

};

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;

window.onPlayerStateChange = (event: any) => {

  if (event.data === window.YT.PlayerState.PLAYING && !done) {

    setTimeout(stopVideo, 6000);
    done = true;

  }

};

function stopVideo() {
  // player.stopVideo();
}

if (Object.prototype.hasOwnProperty.call(window, 'userId') &&
    window.userId.length) {

  /**
   *
   * Last FM User
   * @desc grab the last fm user info and display
   *
   */
  request(
    `/api/lastfm/user/${window.userId}`,
    (err: any, response: any, body: any) => {

      const userInfo = JSON.parse(body);
      const picture = userInfo.image[1]['#text'];
      const playcount: string = userInfo.playcount;

    },
  );

  /**
   *
   * Last FM User's Friends
   * @desc grab the last fm user's friends
   *
   */
  request(
    `/api/lastfm/friends/${window.userId}`,
    (err: any, response: any, body: any) => {

      const userInfo = JSON.parse(body);

    },
  );

}
