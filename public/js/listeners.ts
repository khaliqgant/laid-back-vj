require('./effects');
const LastFm = require('./lastfm');

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

    const Confirm: any = document
      .getElementsByClassName('js-confirm-lastfm')[0];
    Confirm.addEventListener('click', checkUser);

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

function checkUser(e: KeyboardEvent) {

  const noUser: any = document
    .getElementsByClassName('js-no-user')[0];
  noUser.classList.add('none');

  if (e.type === 'click' || e.charCode === 13) {

    const input: any = document
      .getElementsByClassName('js-last-input')[0];
    const username: string = input.value.toString();

    if (username === '') {

      return;

    }

    LastFm.user(username)
      .then((userInfo: any) => {

        if (Object.prototype.hasOwnProperty.call(userInfo, 'error')) {

          noUser.classList.remove('none');

        } else {

          window.location.href = `/lastfm/${username}`;

        }

      })
      .catch((error: any) => {

        noUser.classList.remove('none');

      });


  }

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
  input.addEventListener('keypress', checkUser);

  input.parentNode.style.display = 'inline-block';

}
