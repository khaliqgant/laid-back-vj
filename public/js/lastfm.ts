declare let Promise: any;

const request = require('browser-request');

export function template(): Promise<any> {

  return new Promise((resolve: Function, reject: Function) => {

    request(
      '/templates/lastfm.html',
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
 * Last FM User
 * @desc grab the last fm user info and display
 *
 */
export function user(username: string): Promise<any> {

  return new Promise((resolve: Function, reject: Function) => {

    request(
      `/api/lastfm/user/${username}`,
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

/**
 *
 * Last FM User's Friends
 * @desc grab the last fm user's friends
 *
 */
export function friends(username: string): Promise<any> {

  return new Promise((resolve: Function, reject: Function) => {

    request(
      `/api/lastfm/friends/${username}`,
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
