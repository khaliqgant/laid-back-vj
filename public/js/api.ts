const request = require('browser-request');

export function saveShare(hash: string, shareInfo: any) {

  return new Promise((resolve: Function, reject: Function) => {

    request(
      {
        json: { shareInfo },
        method: 'POST',
        url: `/share/api/${hash}`,
      },
      (err: any, response: any, body: any) => {

        if (err) {

          reject(err);

        }
        resolve(body);

      },
    );

  });

}
