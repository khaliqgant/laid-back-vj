import Base from './base';
import { TrackQuery } from '../interfaces/VideoQuery';

import { SpotifyAPI as spotifyApi } from '../library/spotifyApi';

import Video = require('../library/video');

const Q = require('q');

const SpotifyAPI = spotifyApi.getInstance();

export default class Spotify extends Base {

  public getRoutes(): any {

    return {
      recent: {
        filter: 'Most Recently Listened To',
        link: 'recent',
      },
      topTracks: {
        filter: 'Top Tracks',
        link: '',
      },
    };

  }

  public getAuthorizeUrl(): string {

    return SpotifyAPI.getAuthorizeUrl();

  }

  public getState(): string {

    return SpotifyAPI.getState();

  }

  public setAccess(code: string, state: string): any {

    if (state === null ||
      (process.env.NODE_ENV === 'production' && state !== this.getState())) {

      return false;

    }

    return SpotifyAPI.setTokens(code)
      .then(() => SpotifyAPI.getInfo());

  }

  public recentTracks(): Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      SpotifyAPI.recents()
        .then((queries: TrackQuery[]) => {

          Video.getSearches(queries)
            .then((youtubeIds: string[]) => {

              resolve(youtubeIds);

            });

        });

    });

  }

  public topTracks(): Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      SpotifyAPI.top()
        .then((queries: TrackQuery[]) => {

          Video.getSearches(queries)
            .then((youtubeIds: string[]) => {

              resolve(youtubeIds);

            });

        });

    });


  }


}
