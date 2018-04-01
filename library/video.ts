import {
  TrackQuery as _TrackQuery,
  ArtistQuery as _ArtistQuery,
} from '../interfaces/VideoQuery';

const Q = require('q');

const YoutubeAPI = require('../library/youtubeApi');
const LastfmAPI = require('../library/lastfmApi');

/**
 *
 * Get Searches
 * @desc given an array of search queries, run a youtube search of each
 * and resolve the ids after making sure it has a result
 *
 */
export function getSearches(
  searches: _ArtistQuery[]|_TrackQuery[],
  filter?: string,
): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    const promises = [];
    for (const search of searches) {

      promises.push(YoutubeAPI.search(search, filter));

    }

    Q.Promise.all(promises)
      .then((ids: string[]) => {

        let youtubeIds: string[] = ids.filter((n: any) => n !== undefined);

        // remove duplicates
        youtubeIds = youtubeIds.filter((info: any, index: number, obj: any) =>
          index === obj.findIndex((y: any) => (
            info.videoId === y.videoId
          )));

        resolve(youtubeIds);

      })
      .catch((error: any) => {

        reject(error);

      });

  });

}
export function fiveYear(): Q.Promise<any> {

  return YoutubeAPI.fiveYear();

}
export function newest(): Q.Promise<any> {

  return YoutubeAPI.newest();

}

export function popular(): Q.Promise<any> {

  return YoutubeAPI.popular();

}

export function year(): Q.Promise<any> {

  return YoutubeAPI.year();

}

export function topCharts(): Q.Promise<any> {

  return LastfmAPI.topCharts();

}
