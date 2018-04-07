import * as copy from 'copy-to-clipboard';

require('./effects');
const LastFm = require('./lastfm');
const DataModel = require('./model');

const LastFmButtons: HTMLCollectionOf<Element> = document
  .getElementsByClassName('js-lastfm-login');

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

const Shares: HTMLCollectionOf<Element> = document
  .getElementsByClassName('js-share');
const Share: any = Shares[0];

/**
 *
 * Share Listener
 * @desc share a set of videos and format the object to what the server expects
 *
 */
Share.addEventListener('click', (e: KeyboardEvent) => {

  e.preventDefault();

  let filterStart: string;
  let messageEnd: string;

  if (DataModel.userName === '') {

    filterStart = 'A friend';
    messageEnd = 'a friend';

  } else {

    filterStart = DataModel.userName;
    messageEnd = DataModel.userName;

  }

  const shareInfo = {
    filter: `${filterStart} thought you might like these videos!`,
    message: `Shared videos from ${messageEnd}`,
    videos: DataModel.videos,
  };

  const hash: string = btoa(JSON.stringify(shareInfo));
  const url: string = `${window.location.origin}/share/${hash}`;
  const copied: boolean = copy(url);

  if (copied) {

    Share.innerHTML = 'Share URL Copied To Your Clipboard!';
    Share.classList.remove('js-share');

  }

});

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
      .catch((_error: any) => {

        noUser.classList.remove('none');

      });


  }

}

function showInput(className: string) {

  const inputs: HTMLCollectionOf<Element> = document
    .getElementsByClassName(className);
  const input: any = inputs[0];
  input.addEventListener('keypress', checkUser);

  input.parentNode.style.display = 'inline-block';

}
