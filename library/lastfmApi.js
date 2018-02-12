"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require('q');
const config = require('../config.json');
// @see https://github.com/maxkueng/node-lastfmapi
const LastfmAPI = require('lastfmapi');
const lfm = new LastfmAPI({
    api_key: config.lastfm.apiKey,
    secret: config.lastfm.secret,
});
/**
 *
 * Get User
 * @desc grab the user info
 * @see https://www.last.fm/api/show/user.getInfo
 *
 *
 */
function user(userId) {
    return Q.Promise((resolve, reject) => {
        lfm.user.getInfo(userId, (error, userInfo) => {
            if (error !== null) {
                reject(error);
            }
            else {
                resolve(userInfo);
            }
        });
    });
}
exports.user = user;
/**
 *
 * Get Friends
 * @desc grab the user info
 * @see https://www.last.fm/api/show/user.getFriends
 *
 *
 */
function friends(userId) {
    return Q.Promise((resolve, reject) => {
        lfm.user.getFriends({ user: userId }, (error, friendInfo) => {
            if (error !== null) {
                reject(error);
            }
            else {
                resolve(friendInfo);
            }
        });
    });
}
exports.friends = friends;
/**
 *
 * Last FM Top Tracks
 * @desc grab top tracks from last FM and iterate through each to build a search
 * @see https://github.com/maxkueng/node-lastfmapi
 * @see http://www.last.fm/api/show/user.getTopTracks
 *
 *
 */
function topTracks(params) {
    return Q.Promise((resolve, reject) => {
        lfm.user.getTopTracks(params, (error, topTracksResponse) => {
            if (error !== null) {
                reject(error);
            }
            else {
                const searches = [];
                for (let i = 0; i < topTracksResponse.track.length; i++) {
                    const track = topTracksResponse.track[i];
                    const search = `${track.artist.name} ${track.name} VEVO`;
                    const trackQuery = {
                        artist: track.artist.name,
                        query: search,
                        title: track.name,
                    };
                    searches.push(trackQuery);
                }
                resolve(searches);
            }
        });
    });
}
exports.topTracks = topTracks;
/**
 *
 * Last Fm Recent racks
 * @desc grab most recent tracks from a user and make a search string to search
 * youtube with
 * @see http://www.last.fm/api/show/user.getRecentTracks
 *
 */
function recentTracks(params) {
    return Q.Promise((resolve, reject) => {
        lfm.user.getRecentTracks(params, (error, topTracksResponse) => {
            if (error !== null) {
                reject(error);
            }
            else {
                const searches = [];
                for (let i = 0; i < topTracksResponse.track.length; i++) {
                    const track = topTracksResponse.track[i];
                    const search = `${track.artist.name} ${track.name} VEVO`;
                    const trackQuery = {
                        artist: track.artist.name,
                        query: search,
                        title: track.name,
                    };
                    searches.push(trackQuery);
                }
                resolve(searches);
            }
        });
    });
}
exports.recentTracks = recentTracks;
/**
 *
 * Last Fm Recent Artists
 * @desc grab most recent tracks from the users recent artists
 * @see https://www.last.fm/api/show/user.getTopArtists
 *
 */
function recentArtists(params) {
    return Q.Promise((resolve, reject) => {
        lfm.user.getTopArtists(params, (error, topArtists) => {
            if (error !== null) {
                reject(error);
            }
            else {
                const searches = [];
                for (let i = 0; i < topArtists.artist.length; i++) {
                    const artist = topArtists.artist[i];
                    const search = `${artist.name} VEVO`;
                    const artistQuery = {
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
exports.recentArtists = recentArtists;
//# sourceMappingURL=lastfmApi.js.map