"use strict";
/// <reference path='../typings/tsd.d.ts'/>
exports.__esModule = true;
var Q = require('q');
var config = require('../config.json');
// @see https://github.com/maxkueng/node-lastfmapi
var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
    'api_key': config.lastfm.apiKey,
    'secret': config.lastfm.secret
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
    return Q.Promise(function (resolve, reject) {
        lfm.user.getInfo(userId, function (error, userInfo) {
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
    return Q.Promise(function (resolve, reject) {
        lfm.user.getFriends({ user: userId }, function (error, friendInfo) {
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
    return Q.Promise(function (resolve, reject) {
        lfm.user.getTopTracks(params, function (error, topTracks) {
            if (error !== null) {
                reject(error);
            }
            else {
                var searches = [];
                for (var i = 0; i < topTracks.track.length; i++) {
                    var track = topTracks.track[i];
                    var search = track.artist['#text'] + ' ' + track.name + ' VEVO';
                    var trackQuery = {
                        query: search,
                        artist: track.artist['#text'],
                        title: track.name
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
    return Q.Promise(function (resolve, reject) {
        lfm.user.getRecentTracks(params, function (error, topTracks) {
            if (error !== null) {
                reject(error);
            }
            else {
                var searches = [];
                for (var i = 0; i < topTracks.track.length; i++) {
                    var track = topTracks.track[i];
                    var search = track.artist['#text'] + ' ' + track.name + ' VEVO';
                    var trackQuery = {
                        query: search,
                        artist: track.artist['#text'],
                        title: track.name
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
    return Q.Promise(function (resolve, reject) {
        lfm.user.getTopArtists(params, function (error, topArtists) {
            if (error !== null) {
                reject(error);
            }
            else {
                var searches = [];
                for (var i = 0; i < topArtists.artist.length; i++) {
                    var artist = topArtists.artist[i];
                    var search = artist.name + ' VEVO';
                    var artistQuery = {
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
exports.recentArtists = recentArtists;
