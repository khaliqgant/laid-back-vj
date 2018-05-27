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
  ArtistResponse as _ArtistResponse,
} from '../interfaces/Spotify';
import { Response as _YoutubeResponse } from '../interfaces/Youtube';

const Q = require('q');
const crypto = require('crypto');

// @see https://github.com/thelinmichael/spotify-web-api-node
const Spotify = require('spotify-web-api-node');

export class SpotifyAPI {

  public static getInstance(): SpotifyAPI {

    return SpotifyAPI.instance;

  }

  private static instance: SpotifyAPI = new SpotifyAPI();

  private SpotifyAPI: SpotifyAPI;

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
  public setTokens(code: string): Q.Promise<boolean|Error> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.authorizationCodeGrant(code)
        .then((data: _AuthResponse) => {

          this.api.setAccessToken(data.body.access_token);
          this.api.setRefreshToken(data.body.refresh_token);
          resolve(true);

        })
        .catch((error: Error) => {

          reject(error);

        });

    });

  }

  public getInfo(): Q.Promise<_UserResponse|Error> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.getMe()
        .then((info: _UserResponse) => {

          resolve(info);

        })
        .catch((error: Error) => {

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
  public recents<E>(): Q.Promise<_TrackQuery|E> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.getMyRecentlyPlayedTracks()
        .then((recentTracks: _TrackResponse) => {

          resolve(this.formSearch(recentTracks));

        })
        .catch((error: E) => {

          reject(error);

        });

    });

  }

  /**
   *
   * Top
   * @see https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
   *
   */
  public top<E>(): Q.Promise<_TrackQuery|E> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.getMyTopTracks()
        .then((recentTracks: _ItemResponse) => {

          resolve(this.formSearch(recentTracks));

        })
        .catch((error: E) => {

          reject(error);

        });

    });

  }

  /**
   *
   * Artists
   * @desc get a users top artists and find videos for that artist
   * @see https://github.com/thelinmichael/spotify-web-api-node/blob/master/src/spotify-web-api.js#L976
   * @see https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
   *
   */
  public artists<E>(): Q.Promise<_ArtistQuery[]|E> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.getMyTopArtists()
        .then((recentArtists: _ArtistResponse) => {

          const searches: _ArtistQuery[] = [];
          for (const artist of recentArtists.body.items) {

            const search = `${artist.name}`;
            const artistQuery: _ArtistQuery = {
              artist: artist.name,
              query: search,
              ranking: artist.popularity.toString(),
            };
            searches.push(artistQuery);

          }
          resolve(searches);

        })
        .catch((error: E) => {

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
  public saved(): Q.Promise<_TrackQuery[]|Error> {

    return Q.Promise((resolve: Function, reject: Function) => {

      this.api.getMySavedTracks()
        .then((recentTracks: _ItemResponse) => {

          resolve(this.formSearch(recentTracks));

        })
        .catch((error: Error) => {

          reject(error);

        });

    });

  }

  /**
   *
   * Recommendations
   * @desc given a base of the users top artists return recommendations
   * @see https://developer.spotify.com/web-api/get-recommendations/
   * @see https://github.com/thelinmichael/spotify-web-api-node/blob/master/src/spotify-web-api.js#L779
   * TODO
   *
   */
  public recommendations<U>(): Q.Promise<U> {

    return Q.Promise((resolve: Function, reject: Function) => {

      resolve([]);
      reject(null);

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
      const query: string = `${artist} ${title}`;
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
