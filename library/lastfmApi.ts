import {
  TrackQuery as _TrackQuery,
  ArtistQuery as _ArtistQuery,
} from '../interfaces/VideoQuery';
import {
  Tracks as _TrackResponse,
  Track as _LastFmTrack,
  User as _UserResponse,
  Friends as _FriendResponse,
  Artist as _LastFmArtist,
  Artists as _ArtistResponse,
  SearchParams as _SearchParams,
} from '../interfaces/Lastfm';
import { Response as _YoutubeResponse } from '../interfaces/Youtube';

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

    lfm.user.getInfo(userId, (error: any, userInfo: _UserResponse) => {

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
      (error: any, friendInfo: _FriendResponse) => {

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
export function topTracks(params: _SearchParams): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm.user.getTopTracks(
      params,
      (error: any, topTracksResponse: _TrackResponse) => {

        if (error !== null) {

          reject(error);

        } else {

          const searches = [];
          for (let i = 0; i < topTracksResponse.track.length; i++) {

            const track: _LastFmTrack = topTracksResponse.track[i];
            const search = `${track.artist.name} ${track.name}`;
            const trackQuery: _TrackQuery = {
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
export function recentTracks(params: _SearchParams): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm.user.getRecentTracks(
      params,
      (error: any, topTracksResponse: _TrackResponse) => {

        if (error !== null) {

          reject(error);

        } else {

          const searches = [];
          for (let i = 0; i < topTracksResponse.track.length; i++) {

            const track: _LastFmTrack = topTracksResponse.track[i];
            const artist = track.artist['#text'];
            const search = `${artist} ${track.name} VEVO`;
            const trackQuery: _TrackQuery = {
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
export function recentArtists(params: _SearchParams): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm
      .user.getTopArtists(params, (error: any, topArtists: _ArtistResponse) => {

        if (error !== null) {

          reject(error);

        } else {

          const searches = [];
          for (let i = 0; i < topArtists.artist.length; i++) {

            const artist: _LastFmArtist = topArtists.artist[i];
            const search = `${artist.name}`;
            const artistQuery: _ArtistQuery = {
              artist: artist.name,
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

/**
 *
 * Last FM Friends Tracks
 * @desc grab no more than 10 friends, get their listening history
 * then pick 3 tracks at random and compile a list of those videos
 *
 */
export function friendsTracks(params: _SearchParams): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    friends(params.user)
      .then((friendInfo: _FriendResponse) => {

        const friendQueries = [];
        for (const friend of friendInfo.user) {

          const friendParams: _SearchParams = {
            limit: params.limit,
            period: params.period,
            user: friend.name,
          };

          friendQueries.push(topTracks(friendParams));

          if (friendQueries.length > 10) {

            break;

          }

        }

        Q.all(friendQueries)
          .then((searches: _TrackQuery[][]) => {

            resolve(pluckQueries(searches, 4));

          })
          .catch((searchError: any) => {

            reject(searchError);

          });


      })
      .catch((error: any) => {

        reject(error);

      });

  });

}

/**
 *
 * Last Fm Recommended Tracks
 * @desc grab top tracks then find tracks recommended from that list
 * then pick a subset from that list to find videos for
 * @see https://www.last.fm/api/show/track.getSimilar
 *
 */
export function recommended(params: _SearchParams): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm.user.getTopTracks(
      params,
      (error: any, topTracksResponse: _TrackResponse) => {

        if (error !== null) {

          reject(error);

        } else {

          const similars = [];
          for (let i = 0; i < topTracksResponse.track.length; i++) {

            const trackInfo: _LastFmTrack = topTracksResponse.track[i];
            const artist: string = trackInfo.artist.name;
            const track: string = trackInfo.name;

            similars.push(similarTrack(artist, track));

          }

          Q.all(similars)
            .then((searches: _TrackQuery[][]) => {

              resolve(pluckQueries(searches, 6));

            })
            .catch((searchError: any) => {

              reject(searchError);

            });

        }

      },
    );

  });

}

/**
 *
 * Similar Tracks
 * @desc grab a similar track given an artist and track name and send back
 * a formatted video search from the results
 *
 */
function similarTrack(artist: string, trackName: string): Q.Promise<any> {

  return Q.Promise((resolve: Function, _reject: Function) => {

    lfm.track.getSimilar(
      { artist, track: trackName },
      (error: any, tracks: _TrackResponse) => {

        const queries: _TrackQuery[] = [];

        for (const track of tracks.track) {

          const search = `${track.artist.name} ${track.name} VEVO`;

          const trackQuery: _TrackQuery = {
            artist: track.artist.name,
            query: search,
            title: track.name,
          };

          queries.push(trackQuery);

        }

        resolve(queries);

      },
    );

  });

}

/**
 *
 * Pluck Queries
 * @desc some lastfm query returns a set of track for each original track.
 * Reduce that array of array of objects into an array of objects
 *
 */
function pluckQueries(nestedQueries: _TrackQuery[][], toPluck: number):
  _TrackQuery[] {

  let trackQueries: _TrackQuery[] = [];

  for (const queries of nestedQueries) {

    const len: number = queries.length;

    if (len > 0) {

      trackQueries = trackQueries.concat(randoms(len - 1, toPluck, queries));

    }

  }

  return trackQueries;

}

/**
 *
 * Randoms
 * @desc pick a random set of elements from an array
 * @see https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
 *
 */
function randoms(len: number, totalNumber: number, queries: _TrackQuery[]) {

  const rands = [];
  const picked: _TrackQuery[] = [];

  while (rands.length < totalNumber) {

    const num = Math.floor(Math.random() * len) + 1;

    if (rands.indexOf(num) === -1) {

      rands[rands.length] = num;
      picked.push(queries[num]);

    }

  }

  return picked;

}
