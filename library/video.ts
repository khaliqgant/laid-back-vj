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

        const result: any = [];
        for (const search of searches) {

          result.push(YoutubeAPI.search(search)
            .then((id: string) => id));

        }

        resolve(Q.all(result));

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

        const result = [];

        for (const search of searches) {

          result.push(YoutubeAPI.search(search)
            .then((id: string) => id));

        }

        resolve(Q.all(result));

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

        const result = [];

        for (const search of searches) {

          result.push(YoutubeAPI.search(search)
            .then((id: string) => id));

        }

        resolve(Q.all(result));

      })

      .catch((error: any) => {

        reject(error);

      });

  });

}
