declare let Promise: any;

const LastFmApi = require('./lastfm');
const Responsive = require('./responsive');

interface Window {
    lastfmUserId: string;
    userId: string;
    videos: string[];
    Handlebars: any;
    defaultWidth: any;
    onYouTubeIframeAPIReady: Function;
    onPlayerReady: Function;
    onPlayerStateChange: Function;
    YT: any;
}

// 4. The API will call this function when the video player is ready.
window.onPlayerReady = (event: any) => {

  // Responsive.videoWidth();
  event.target.loadPlaylist(window.videos);

};

if (Object.prototype.hasOwnProperty.call(window, 'lastfmUserId') &&
    window.lastfmUserId.length) {

  Promise.all([
    LastFmApi.template(),
    LastFmApi.user(window.lastfmUserId),
    LastFmApi.friends(window.lastfmUserId),
  ])
  // add interface
    .then((results: any) => {

      const template = window.Handlebars.compile(results[0]);
      const userInfo = results[1];
      const friends = results[2];
      const picture = userInfo.image[2]['#text'];

      // add in friends, play count and country
      // maybe move this to above the player?
      const info = template({
        picture,
      });
      const SidebarProfile: any = document
        .getElementsByClassName('js-profile')[0];
      SidebarProfile.innerHTML = info;


    });

}
