import { TrackQuery, ArtistQuery } from '../interfaces/VideoQuery';

const Q = require('q');
const config = require('../config.json');

const LastfmAPI = require('../library/lastfmApi');
const YoutubeAPI = require('../library/youtubeApi');


/**
 *
 * Recent Tracks
 *
 */
export function recentTracks(params: any): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    LastfmAPI.recentTracks(params)
      .then((searches: TrackQuery[]) => {

        getSearches(searches)
          .then((searchIds: string[]) => {

            resolve(searchIds);

          })
          .catch((error: any) => {

            reject(error);

          });

      })
      .catch((error: any) => {

        reject(error);

      });

  });

}


export function recentArtists(params: any): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    LastfmAPI.recentArtists(params)
      .then((searches: ArtistQuery[]) => {

        getSearches(searches)
          .then((searchIds: string[]) => {

            resolve(searchIds);

          })
          .catch((error: any) => {

            reject(error);

          });

      })

      .catch((error: any) => {

        reject(error);

      });

  });

}

/**
 *
 * Top Tracks
 * @desc grab last FM data and return an array of youtube ids
 *
 */
export function topTracks(params: any): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    LastfmAPI.topTracks(params)
      .then((searches: TrackQuery[]) => {

        getSearches(searches)
          .then((searchIds: string[]) => {

            resolve(searchIds);

          })
          .catch((error: any) => {

            reject(error);

          });

      })

      .catch((error: any) => {

        reject(error);

      });

  });

}

function getSearches(searches: ArtistQuery[]|TrackQuery[]): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    const promises = [];
    for (const search of searches) {

      promises.push(YoutubeAPI.search(search));

    }

    Q.Promise.all(promises)
      .then((ids: string[]) => {

        const youtubeIds: string[] = ids.filter((n: any) => n !== undefined);

        resolve(youtubeIds);

      })
      .catch((error: any) => {

        reject(error);

      });

  });

}
