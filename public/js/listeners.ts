const LastFmButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('js-lastfm-login');

if (LastFmButtons.length > 0) {
    const LastFmButton: Element = document.getElementsByClassName('js-lastfm-login')[0];
    LastFmButton.addEventListener('click', function () {

        // replace the button with an input area so the user can put in their user name
        console.log('clicked');

    });
}
