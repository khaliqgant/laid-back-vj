import { TrackQuery, ArtistQuery } from '../interfaces/VideoQuery';
import {
  Tracks as TrackResponse,
  Track as LastFmTrack, User as UserResponse,
  Friends as FriendResponse,
  Artist as LastFmArtist,
  Artists as ArtistResponse,
} from '../interfaces/Lastfm';
import { Response as YoutubeResponse } from '../interfaces/Youtube';

const Q = require('q');

// @see https://github.com/thelinmichael/spotify-web-api-node
const SpotifyAPI = require('spotify-web-api-node');

const spotify = new SpotifyAPI({
  clientId: process.env.SPOTIFY_KEY,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: process.env.SPOTIFY_CALLBACK_URL,
});

/**
 *
 * Login
 * @see Scopes: https://developer.spotify.com/web-api/using-scopes/
 *
 */
export function login() {

  const scopes = [
    'user-follow-read',
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
  ];
  const state = '';

}

