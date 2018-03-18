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
          const artistName = videoTitle.slice(0, videoTitle.indexOf('-'));

          resolve({
            artist: artistName,
            title: videoTitle,
            videoId,
          });

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

export function fiveYear(): Q.Promise<any> {

  return range(5);

}

export function tenYear(): Q.Promise<any> {

  return range(10);

}

function range(years: number): Q.Promise<any> {

  const period: string = moment().subtract(years, 'year').format();
  const periodBefore: string = moment().subtract(years + 3, 'year').format();

  return time(periodBefore, period, 'date');

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

export function artist(name: string): Q.Promise<any> {

  const query: string = `${name} vevo`;
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
 * not used, implement a different way
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

function time(after: string, before?: string, order?: string): Q.Promise<any> {

  const query: string = 'music videos vevo';
  const params: any = {
    order: 'viewCount',
    publishedAfter: after,
    type: 'video',
  };

  if (before) {

    params.publishedBefore = before;

  }

  if (order) {

    params.order = order;

  }

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
