require('./effects');

const LastFmButtons: HTMLCollectionOf<Element> = document
  .getElementsByClassName('js-lastfm-login');
const SpotifyButtons: HTMLCollectionOf<Element> = document
  .getElementsByClassName('js-spotify-login');
const SpotifyUndos: HTMLCollectionOf<Element> = document
  .getElementsByClassName('js-undo-spotify');
const LastFmUndos: HTMLCollectionOf<Element> = document
  .getElementsByClassName('js-undo-lastfm');

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

if (SpotifyUndos.length > 0) {

  const undo = SpotifyUndos[0];
  undo.addEventListener('click', () => {

    showButton(undo);

  });

}

if (LastFmUndos.length > 0) {

  const undo = LastFmUndos[0];
  // click listener isn't binding
  undo.addEventListener('click', () => {

    showButton(undo);

  });

}

function showButton(undo: any) {

  undo.parentNode.style.dipslay = 'none';
  const button = undo.parentNode.previousSibling;
  undo.parentNode.previousSibling.style.display = 'inline';

}


function showInput(className: string) {

  const inputs: HTMLCollectionOf<Element> = document
    .getElementsByClassName(className);
  const input: any = inputs[0];

  input.parentNode.style.display = 'inline-block';

}
