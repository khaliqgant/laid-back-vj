import * as moment from 'moment';
import * as geoip from 'geoip-lite';

import { TrackQuery, ArtistQuery } from '../interfaces/VideoQuery';
import { Response as YoutubeResponse } from '../interfaces/Youtube';

const Q = require('q');

const YoutubeAPI = require('../library/youtubeApi');

// @see https://github.com/nodenica/youtube-node
const YouTube = require('youtube-node');

const youTube = new YouTube();
youTube.setKey(process.env.YOUTUBE_KEY);

const NUM_VIDEOS: number = 25;

/**
 *
 * Search
 * @desc run a youtube search based on a query string
 * @see https://developers.google.com/youtube/v3/docs/search/list
 *
 */
export function search(searchOb: ArtistQuery|TrackQuery): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    const numResults: number = 1;

    youTube.search(
      searchOb.query,
      numResults,
      { type: 'video' },
      (error: any, result: YoutubeResponse) => {

        if (error) {

          reject(error);

        } else {

          if (result.items.length === 0) {

            resolve();
            return;

          }
          const videoId = result.items[0].id.videoId;
          const videoTitle = result.items[0].snippet.title;

          // perform some kind of similarity check?
          const artist = videoTitle.slice(0, videoTitle.indexOf('-'));
          resolve(videoId);

        }

      },
    );

  });

}

/**
 *
 * Newest
 * @desc grab "newest" videos from one month back to now
 *
 */
export function newest(): Q.Promise<any> {

  const oneMonthAgo: string = moment().subtract(1, 'months').format();

  return time(oneMonthAgo);

}

/**
 *
 * Newest
 * @desc grab "newest" videos from one month back to now
 *
 */
export function year(): Q.Promise<any> {

  const oneYear: string = moment().subtract(1, 'year').format();

  return time(oneYear);

}

export function tenYear(): Q.Promise<any> {

  const tenYears: string = moment().subtract(10, 'year').format();

  return time(tenYears);

}


/**
 *
 * Popular
 * @desc grab the most popular music videos and return back the ids
 */
export function popular(): Q.Promise<any> {

  const query: string = 'music videos vevo';
  const params = {
    order: 'viewCount',
    type: 'video',
  };

  return baseSearch(query, params, NUM_VIDEOS);

}

/**
 *
 * Near Me
 * @see https://developers.google.com/youtube/v3/docs/search/list#optional-parameters
 * TODO https://developers.google.com/youtube/v3/docs/videos/list#regionCode
 *
 */
export function nearMe(ip: string): Q.Promise<any> {

  const geo: geoip.Lookup = geoip.lookup(ip);
  const query: string = 'music videos vevo';
  const params = {
    location: geo.ll.toString() || 0,
    locationRadius: '1500000m',
    order: 'viewCount',
    type: 'video',
  };

  return baseSearch(query, params, NUM_VIDEOS);

}

function time(period: string): Q.Promise<any> {

  const query: string = 'music videos vevo';
  const params = {
    order: 'viewCount',
    publishedAfter: period,
    type: 'video',
  };

  return baseSearch(query, params, NUM_VIDEOS);

}

function baseSearch(query: string, params: any, numResults: number):
  Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    youTube.search(
      query,
      numResults,
      params,
      (error: any, result: YoutubeResponse) => {

        if (error) {

          reject(error);

        } else {

          const videoObjects = result.items;
          const videoIds = videoObjects.map((vid, i) => vid.id.videoId);

          resolve(videoIds);

        }

      },
    );

  });

}
