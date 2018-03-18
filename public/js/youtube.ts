declare let Promise: any;

const LastFmApi = require('./lastfm');

interface Window {
    lastfmUserId: string;
    userId: string;
    videos: any[];
    Handlebars: any;
    onYouTubeIframeAPIReady: Function;
    onPlayerReady: Function;
    onPlayerStateChange: Function;
    onPlayerError: Function;
    YT: any;
}

/**
 *
 * On Player Ready
 * @desc
 *
 */
window.onPlayerReady = (event: any) => {

  const videoIds: string[] = [];
  for (const video of window.videos) {

    videoIds.push(video.videoId || video);

  }
  event.target.loadPlaylist(videoIds);

};

/**
 *
 * On Player State Change
 *
 */
window.onPlayerStateChange = (event: any) => {

  console.log('state change');
  console.log(event);
  const index = event.target.getPlaylistIndex();
  console.log(index);

};

window.onPlayerError = (event: any) => {

  console.log('error');
  console.log(event);

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
