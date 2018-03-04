headerHovers();

/**
 *
 * Header Hovers
 * @desc when hovering the services in the header swap out the image
 *
 */
function headerHovers() {

  const SpotifyLogos: HTMLCollectionOf<Element> = document
    .getElementsByClassName('js-spotify');

  if (SpotifyLogos.length > 0) {

    const SpotifyLogo: any = SpotifyLogos[0];

    SpotifyLogo.addEventListener('mouseover', () => {

      const img = SpotifyLogo.childNodes[0];
      img.src = '/img/spotify_green.png';

    });

    SpotifyLogo.addEventListener('mouseleave', () => {

      const img = SpotifyLogo.childNodes[0];
      img.src = '/img/spotify.png';

    });

  }


  const LastfmLogos: HTMLCollectionOf<Element> = document
    .getElementsByClassName('js-lastfm');

  if (LastfmLogos.length > 0) {

    const LastfmLogo: any = LastfmLogos[0];

    LastfmLogo.addEventListener('mouseover', () => {

      const img = LastfmLogo.childNodes[0];
      img.src = '/img/lastfm_white.png';

    });

    LastfmLogo.addEventListener('mouseleave', () => {

      const img = LastfmLogo.childNodes[0];
      img.src = '/img/lastfm.png';

    });

  }

}
