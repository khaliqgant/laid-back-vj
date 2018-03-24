declare let Promise: any;

const request = require('browser-request');

export function template(): Promise<any> {

  return new Promise((resolve: Function, reject: Function) => {

    request(
      '/templates/spotify.html',
      (err: any, response: any, body: any) => {

        if (err) {

          reject(err);

        }
        resolve(body);

      },
    );

  });

}
/**
 *
 * Spotify User
 * @desc grab the spotify user info and display
 *
 */
export function user(): Promise<any> {

  return new Promise((resolve: Function, reject: Function) => {

    request(
      '/api/spotify/user/',
      (err: any, response: any, body: any) => {

        if (err) {

          reject(err);

        }
        const userInfo = JSON.parse(body);
        resolve(userInfo);

      },
    );

  });

}
