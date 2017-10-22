import {TrackQuery, ArtistQuery} from '../interfaces/VideoQuery';
import {Tracks as TrackResponse, Track as LastFmTrack, User as UserResponse,
    Friends as FriendResponse, Artist as LastFmArtist, Artists as ArtistResponse}
    from '../interfaces/Lastfm';
import {Response as YoutubeResponse} from '../interfaces/Youtube';

const Q = require('q');
const config = require('../config.json');

// @see https://github.com/maxkueng/node-lastfmapi
const LastfmAPI = require('lastfmapi');
const lfm = new LastfmAPI({
    'api_key' : config.lastfm.apiKey,
    'secret' : config.lastfm.secret
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
        lfm.user.getInfo(userId, function(error: any, userInfo: UserResponse) {
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
        lfm.user.getFriends({user: userId}, function(error: any, friendInfo: FriendResponse) {
            if (error !== null) {
                reject(error);
            } else {
                resolve(friendInfo);
            }
        });
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
        lfm.user.getTopTracks(params, function(error: any, topTracks: TrackResponse) {
            if (error !== null) {
                reject(error);
            } else {
                let searches = [];
                for (let i = 0; i < topTracks.track.length; i++)
                {
                    let track: LastFmTrack = topTracks.track[i];
                    let search = track.artist.name + ' ' + track.name + ' VEVO';
                    const trackQuery: TrackQuery = {
                        query: search,
                        artist: track.artist.name,
                        title: track.name
                    };
                    searches.push(trackQuery);
                }
                resolve(searches);
            }
        });
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
        lfm.user.getRecentTracks(params, function(error: any, topTracks: TrackResponse) {
            if (error !== null) {
                reject(error);
            } else {
                let searches = [];
                for (let i = 0; i < topTracks.track.length; i++)
                {
                    let track: LastFmTrack = topTracks.track[i];
                    let search = track.artist.name + ' ' + track.name + ' VEVO';
                    const trackQuery: TrackQuery = {
                        query: search,
                        artist: track.artist.name,
                        title: track.name
                    };
                    searches.push(trackQuery);
                }
                resolve(searches);
            }
        });
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
        lfm.user.getTopArtists(params, function(error: any, topArtists: ArtistResponse) {
            if (error !== null) {
                reject(error);
            } else {
                let searches = [];
                for (let i = 0; i < topArtists.artist.length; i++)
                {
                    let artist: LastFmArtist = topArtists.artist[i];
                    let search = artist.name + ' VEVO';
                    const artistQuery: ArtistQuery = {
                        query: search,
                        artist: artist.name,
                        ranking: artist["@attr"].rank
                    };
                    searches.push(artistQuery);
                }
                resolve(searches);
            }
        });
    });

}

