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

// @see https://github.com/maxkueng/node-lastfmapi
const LastfmAPI = require('lastfmapi');

const lfm = new LastfmAPI({
  api_key: process.env.LASTFM_KEY,
  secret: process.env.LASTFM_SECRET,
});


/**
 *
 * Get User
 * @desc grab the user info
 * @see https://www.last.fm/api/show/user.getInfo
 *
 *
 */
export function user(userId: string): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm.user.getInfo(userId, (error: any, userInfo: UserResponse) => {

      if (error !== null) {

        reject(error);

      } else {

        resolve(userInfo);

      }

    });

  });

}

/**
 *
 * Get Friends
 * @desc grab the user info
 * @see https://www.last.fm/api/show/user.getFriends
 *
 *
 */
export function friends(userId: string): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm.user.getFriends(
      { user: userId },
      (error: any, friendInfo: FriendResponse) => {

        if (error !== null) {

          reject(error);

        } else {

          resolve(friendInfo);

        }

      },
    );

  });

}

/**
 *
 * Last FM Top Tracks
 * @desc grab top tracks from last FM and iterate through each to build a search
 * @see https://github.com/maxkueng/node-lastfmapi
 * @see http://www.last.fm/api/show/user.getTopTracks
 *
 *
 */
export function topTracks(params: any): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm.user.getTopTracks(
      params,
      (error: any, topTracksResponse: TrackResponse) => {

        if (error !== null) {

          reject(error);

        } else {

          const searches = [];
          for (let i = 0; i < topTracksResponse.track.length; i++) {

            const track: LastFmTrack = topTracksResponse.track[i];
            const search = `${track.artist.name} ${track.name} VEVO`;
            const trackQuery: TrackQuery = {
              artist: track.artist.name,
              query: search,
              title: track.name,
            };
            searches.push(trackQuery);

          }

          resolve(searches);

        }

      },
    );

  });

}

/**
 *
 * Last Fm Recent racks
 * @desc grab most recent tracks from a user and make a search string to search
 * youtube with
 * @see http://www.last.fm/api/show/user.getRecentTracks
 *
 */
export function recentTracks(params: any): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm.user.getRecentTracks(
      params,
      (error: any, topTracksResponse: TrackResponse) => {

        if (error !== null) {

          reject(error);

        } else {

          const searches = [];
          for (let i = 0; i < topTracksResponse.track.length; i++) {

            const track: LastFmTrack = topTracksResponse.track[i];
            const artist = track.artist['#text'];
            const search = `${artist} ${track.name} VEVO`;
            const trackQuery: TrackQuery = {
              artist,
              query: search,
              title: track.name,
            };
            searches.push(trackQuery);

          }
          resolve(searches);

        }

      },
    );

  });

}

/**
 *
 * Last Fm Recent Artists
 * @desc grab most recent tracks from the users recent artists
 * @see https://www.last.fm/api/show/user.getTopArtists
 *
 */
export function recentArtists(params: any): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm.user.getTopArtists(params, (error: any, topArtists: ArtistResponse) => {

      if (error !== null) {

        reject(error);

      } else {

        const searches = [];
        for (let i = 0; i < topArtists.artist.length; i++) {

          const artist: LastFmArtist = topArtists.artist[i];
          const search = `${artist.name} VEVO`;
          const artistQuery: ArtistQuery = {
            artist: artist['#text'],
            query: search,
            ranking: artist['@attr'].rank,
          };
          searches.push(artistQuery);

        }
        resolve(searches);

      }

    });

  });

}

