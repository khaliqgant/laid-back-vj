declare let Promise: any;

const LastFmApi = require('./lastfm');
const request = require('browser-request');

loadArtistTemplate();
let artistTemplate: any = null;
let currentIndex = -1;

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
 * On Player State Change
 *
 */
window.onPlayerStateChange = (event: any) => {

  const index = event.target.getPlaylistIndex();
  if (index !== currentIndex) {

    const artistInfo = window.videos[index];

    if (typeof artistInfo === 'string') {

      return;

    }

    if (artistTemplate !== null) {

      artistInfo.artistLink = encodeURIComponent(artistInfo.artist);
      const template = window.Handlebars.compile(artistTemplate);
      const info = template(artistInfo);
      const Artist: any = document
        .getElementsByClassName('js-artist')[0];
      Artist.innerHTML = info;

      const SideBarArtistLink: any = document
        .getElementsByClassName('js-artist-fill-in');

      if (SideBarArtistLink.length > 0) {

        const SidebarLink = SideBarArtistLink[0];
        const url = SidebarLink.getAttribute('href');
        const baseUrl = url.split('?')[0];

        const href = `${baseUrl}?name=${artistInfo.artistLink}`;

        SidebarLink.setAttribute('href', href);

      }

    }
    currentIndex = index;

  }

};

/**
 *
 * Load Artisr Template
 * @desc load in the artist template to display a link under the video
 *
 */
function loadArtistTemplate() {

  request(
    '/templates/artist.html',
    (err: any, response: any, body: any) => {

      artistTemplate = body;

    },
  );

}

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
        friends,
        picture,
        userInfo,
      });
      const SidebarProfile: any = document
        .getElementsByClassName('js-profile')[0];
      SidebarProfile.innerHTML = info;


    });

}
