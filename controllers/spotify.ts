import { TrackQuery as _TrackQuery } from '../interfaces/VideoQuery';
import { SearchResult as _YoutubeSearchResult } from '../interfaces/Youtube';

import Base from './base';

import { SpotifyAPI as spotifyApi } from '../library/spotifyApi';

import Video = require('../library/video');

const Q = require('q');

const SpotifyAPI = spotifyApi.getInstance();

export default class Spotify extends Base {

  public getRoutes(): any {

    return {
      artists: {
        filter: 'Top Artists',
        link: 'artists',
      },
      recent: {
        filter: 'Most Recently Listened To',
        link: 'recent',
      },
      saved: {
        filter: 'Saved Tracks',
        link: 'saved',
      },
      top: {
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

  public recent<E>(): Promise<_YoutubeSearchResult|E> {

    return Q.Promise((resolve: Function, reject: Function) => {

      SpotifyAPI.recents()
        .then((queries: _TrackQuery[]) => {

          Video.getSearches(queries, 'audioAndArtist')
            .then((youtubeIds: _YoutubeSearchResult[]) => {

              resolve(youtubeIds);

            });

        })
        .catch((error: E) => {

          reject(error);

        });

    });

  }

  public top<E>(): Promise<_YoutubeSearchResult[]|E> {

    return Q.Promise((resolve: Function, reject: Function) => {

      SpotifyAPI.top()
        .then((queries: _TrackQuery[]) => {

          Video.getSearches(queries, 'audioAndArtist')
            .then((youtubeIds: _YoutubeSearchResult[]) => {

              resolve(youtubeIds);

            });

        })
        .catch((error: E) => {

          reject(error);

        });

    });

  }

  public saved<E>(): Promise<_YoutubeSearchResult[]|E> {

    return Q.Promise((resolve: Function, reject: Function) => {

      SpotifyAPI.saved()
        .then((queries: _TrackQuery[]) => {

          Video.getSearches(queries, 'audioAndArtist')
            .then((youtubeIds: _YoutubeSearchResult[]) => {

              resolve(youtubeIds);

            });

        })
        .catch((error: E) => {

          reject(error);

        });

    });

  }

  public artists<E>(): Promise<_YoutubeSearchResult[]|E> {

    return Q.Promise((resolve: Function, reject: Function) => {

      SpotifyAPI.artists()
        .then((queries: _TrackQuery[]) => {

          Video.getSearches(queries, 'audioAndArtist')
            .then((youtubeIds: _YoutubeSearchResult[]) => {

              resolve(youtubeIds);

            });

        })
        .catch((error: E) => {

          reject(error);

        });

    });

  }


}
