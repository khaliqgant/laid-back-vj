import { AuthResponse } from '../interfaces/Spotify';
import { Response as YoutubeResponse } from '../interfaces/Youtube';

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
        .then((data: AuthResponse) => {

          this.api.setAccessToken(data.body.access_token);
          this.api.setRefreshToken(data.body.refresh_token);
          resolve(true);

        })
        .catch((error: any) => {

          reject(error);

        });

    });

  }

  /**
   *
   * Get Start Playlist
   * @desc build an initial playlist for the user
   *
   */
  // public getStarterPlaylist(): Q.Promise<any> {

  // }

}
