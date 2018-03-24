import { Request as _Request, Response as _Response } from 'express';
import {
  TrackQuery as _TrackQuery,
  ArtistQuery as _ArtistQuery,
} from '../interfaces/VideoQuery';
import { SearchParams as _SearchParams } from '../interfaces/Lastfm';
import { SearchResult as _YoutubeSearchResult } from '../interfaces/Youtube';

import Base from './base';

import Video = require('../library/video');

const Q = require('q');
const LastfmAPI = require('../library/lastfmApi');

export default class LastFm extends Base {

  private cookieName: string = 'LASTFM_USERNAME';

  public getRoutes(): any {

    return {
      allTime: {
        filter: 'All Time Favorites',
        link: '',
      },
      artists: {
        month: {
          filter: 'This Month\'s Most Listened To Artists',
          link: 'artists/month',
        },
        threeMonth: {
          filter: 'Last Three Month\'s Most Listened To Artists',
          link: 'artists/three-month',
        },
        week: {
          filter: 'This Week\'s Most Listened To Artists',
          link: 'artists/week',
        },
        year: {
          filter: 'This Year\'s Most Listened To Artists',
          link: 'artists/year',
        },
      },
      friends: {
        filter: 'What Your Friends Are Listening To',
        link: 'friends',
      },
      month: {
        filter: 'This Month\'s Favorites',
        link: 'month',
      },
      recent: {
        filter: 'Most Recently Listened To',
        link: 'recent',
      },
      recommended: {
        filter: 'Recommended From Your History',
        link: 'recommended',
      },
      year: {
        filter: 'This Year\'s Favorites',
        link: 'year',
      },
    };

  }

  public setUser(res: _Response, userId: string) {

    const ONE_DAY = 3600000 * 24;

    const options = {
      maxAge: ONE_DAY,
    };

    res.cookie(this.cookieName, userId, options);

  }

  public getUser(req: _Request) {

    const user = req.cookies[this.cookieName];

    return user;

  }

  public artists(params: _SearchParams): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      LastfmAPI.recentArtists(params)
        .then((searches: _ArtistQuery[]) => {

          Video.getSearches(searches)
            .then((youtubeIds: _YoutubeSearchResult[]) => {

              resolve(youtubeIds);

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

  public top(params: _SearchParams): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      LastfmAPI.topTracks(params)
        .then((searches: _TrackQuery[]) => {

          Video.getSearches(searches)
            .then((youtubeIds: _YoutubeSearchResult[]) => {

              resolve(youtubeIds);

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

  public recent(params: _SearchParams): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      LastfmAPI.recentTracks(params)
        .then((searches: _TrackQuery[]) => {

          Video.getSearches(searches)
            .then((youtubeIds: _YoutubeSearchResult[]) => {

              resolve(youtubeIds);

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

  public recommended(params: _SearchParams): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      LastfmAPI.recommended(params)
        .then((searches: _TrackQuery[]) => {

          Video.getSearches(searches)
            .then((youtubeIds: _YoutubeSearchResult[]) => {

              resolve(youtubeIds);

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

}
