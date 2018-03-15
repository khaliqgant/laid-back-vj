/**
 *
 * Video Width
 * @desc check the video width and make it smaller if it is smaller than the
 * default size
 *
 */
export function videoWidth() {

  if (window.defaultWidth * 0.75 >= window.outerWidth) {

    const width: number = Number(window.outerWidth * 0.75);
    const players: NodeListOf<Element> = document
      .querySelectorAll('iframe#player');
    const player: Element = players[0];
    player.setAttribute('width', width.toString());

  }

}

