import {
  TrackQuery as _TrackQuery,
  ArtistQuery as _ArtistQuery,
} from '../interfaces/VideoQuery';
import {
  AuthResponse as _AuthResponse,
  UserResponse as _UserResponse,
  TrackResponse as _TrackResponse,
  ItemResponse as _ItemResponse,
  TrackInfo as _TrackInfo,
} from '../interfaces/Spotify';
import { Response as _YoutubeResponse } from '../interfaces/Youtube';

const Q = require('q');
const crypto = require('crypto');

// @see https://github.com/thelinmichael/spotify-web-api-node
const Spotify = require('spotify-web-api-node');

export class SpotifyAPI {

  public static getInstance(): any {

    return SpotifyAPI.instance;

  }

  private static instance: any = new SpotifyAPI();

  private SpotifyAPI: any;

  private api: any;

  private state: string;

  constructor() {

    if (SpotifyAPI.instance) {

      throw new Error('The Spotify is a singleton class and can\' be created!');

    }

    SpotifyAPI.instance = this;

    this.api = new Spotify({
      clientId: process.env.SPOTIFY_KEY,
      clientSecret: process.env.SPOTIFY_SECRET,
      redirectUri: process.env.SPOTIFY_CALLBACK_URL,

    });

    this.state = crypto.randomBytes(20).toString('hex');

  }

  /**
   *
   * Login
   * @see Scopes: https://developer.spotify.com/web-api/using-scopes/
   *
   */
  public getAuthorizeUrl(): string {

    const scopes: string[] = [
      'user-follow-read',
      'user-read-private',
      'user-read-email',
      'user-top-read',
      'user-read-recently-played',
      'user-library-read',
    ];

    const authorizeUrl: string = this.api
      .createAuthorizeURL(scopes, this.state);

    return authorizeUrl;

  }

  public getState(): string {

    return this.state;

  }

  /**
   *
   * Set Tokens
   * @desc given an authorization code set the access and refresh token
   * to make calls to the Spotify API
   *
   */
  public setTokens(code: string): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.authorizationCodeGrant(code)
        .then((data: _AuthResponse) => {

          this.api.setAccessToken(data.body.access_token);
          this.api.setRefreshToken(data.body.refresh_token);
          resolve(true);

        })
        .catch((error: any) => {

          reject(error);

        });

    });

  }

  public getInfo(): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.getMe()
        .then((info: _UserResponse) => {

          resolve(info.body.id);

        })
        .catch((error: any) => {

          reject(error);

        });

    });

  }

  /**
   *
   * Recents
   * @desc get the most recently played tracks by the user
   * @see https://github.com/thelinmichael/spotify-web-api-node/blob/master/src/spotify-web-api.js#L1006
   *
   */
  public recents(): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.getMyRecentlyPlayedTracks()
        .then((recentTracks: _TrackResponse) => {

          resolve(this.formSearch(recentTracks));

        })
        .catch((error: any) => {

          reject(error);

        });

    });

  }

  public top(): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.getMyTopTracks()
        .then((recentTracks: _ItemResponse) => {

          resolve(this.formSearch(recentTracks));

        })
        .catch((error: any) => {

          reject(error);

        });

    });

  }

  /**
   *
   * Saved
   * @desc get the users saved tracks
   * @see https://github.com/thelinmichael/spotify-web-api-node/blob/master/src/spotify-web-api.js#L844
   *
   */
  public saved(): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.getMySavedTracks()
        .then((recentTracks: _ItemResponse) => {

          resolve(this.formSearch(recentTracks));

        })
        .catch((error: any) => {

          reject(error);

        });

    });

  }

  private formSearch(recentTracks: any): _TrackQuery[] {

    const searches = [];
    for (const itemResponse of recentTracks.body.items) {

      const item: _TrackInfo = Object.prototype.hasOwnProperty
        .call(itemResponse, 'track') ? itemResponse.track : itemResponse;
      let artist: string;
      for (const artistObject of item.artists) {

        artist = artistObject.name;
        break;

      }

      const title: string = item.name;
      const query: string = `${artist} ${title} VEVO`;
      const trackQuery: _TrackQuery = {
        artist,
        query,
        title,
      };
      searches.push(trackQuery);

    }

    return searches;

  }

}
