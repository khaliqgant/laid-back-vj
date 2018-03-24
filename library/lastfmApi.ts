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
export function topTracks(params: any): Q.Promise<any> {

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
            const search = `${track.artist.name} ${track.name} VEVO`;
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
export function recentTracks(params: any): Q.Promise<any> {

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
export function recentArtists(params: any): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm
      .user.getTopArtists(params, (error: any, topArtists: _ArtistResponse) => {

        if (error !== null) {

          reject(error);

        } else {

          const searches = [];
          for (let i = 0; i < topArtists.artist.length; i++) {

            const artist: _LastFmArtist = topArtists.artist[i];
            const search = `${artist.name} VEVO`;
            const artistQuery: _ArtistQuery = {
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

/**
 *
 * Last Fm Recommended Tracks
 * @desc grab top tracks then find tracks recommended from that list
 * @see https://www.last.fm/api/show/track.getSimilar
 *
 */
export function recommended(params: any): Q.Promise<any> {

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
            .then((searches: _TrackQuery[]) => {

              resolve(searches);

            })
            .catch((searchError: any) => {

              reject(searchError);

            });

        }

      },
    );

  });

}

function similarTrack(artist: string, trackName: string): Q.Promise<any> {

  return Q.Promise((resolve: Function, reject: Function) => {

    lfm.track.getSimilar(
      { artist, track: trackName },
      (error: any, track: _LastFmTrack) => {

        if (error !== null) {

          // console.log(error);
          reject(error);

        } else {

          const search = `${track.artist.name} ${track.name} VEVO`;

          const trackQuery: _TrackQuery = {
            artist: track.artist.name,
            query: search,
            title: track.name,
          };
          resolve(trackQuery);

        }

      },
    );

  });

}
