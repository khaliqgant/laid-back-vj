const LastFmButtons: HTMLCollectionOf<Element> = document
  .getElementsByClassName('js-lastfm-login');

const SpotifyButtons: HTMLCollectionOf<Element> = document
  .getElementsByClassName('js-spotify-login');


if (LastFmButtons.length > 0) {

  const LastFmButton: any = LastFmButtons[0];

  LastFmButton.addEventListener('click', () => {

    // replace the button with an input area so the user can put in their user name
    LastFmButton.style.display = 'none';
    showInput('js-last-input');

  });

}

if (SpotifyButtons.length > 0) {

  const SpotifyButton: any = SpotifyButtons[0];

  SpotifyButton.addEventListener('click', () => {

    // replace the button with an input area so the user can put in their user name
    SpotifyButton.style.display = 'none';
    showInput('js-spotify-input');

  });

}


function showInput(className: string) {

  const inputs: HTMLCollectionOf<Element> = document
    .getElementsByClassName(className);
  const input: any = inputs[0];

  input.style.display = 'inline-block';

}
