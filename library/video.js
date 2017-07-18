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
// @see https://github.com/nodenica/youtube-node
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey(config.youtube.apiKey);
/**
 *
 * Last FM Top Tracks
 * @desc grab top tracks from last FM and iterate through each to build a search
 * @see https://github.com/maxkueng/node-lastfmapi
 * @see http://www.last.fm/api/show/user.getTopTracks
 *
 *
 */
function lastfmTopTracks(params) {
    return Q.Promise(function (resolve, reject) {
        lfm.user.getTopTracks(params, function (error, topTracks) {
            if (error !== null) {
                reject(error);
            }
            else {
                var searches = [];
                for (var i = 0; i < topTracks.track.length; i++) {
                    var track = topTracks.track[i];
                    var search = track.artist.name + ' ' + track.name;
                    searches.push(search);
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
function lastfmRecentTracks(params) {
    return Q.Promise(function (resolve, reject) {
        lfm.user.getRecentTracks(params, function (error, topTracks) {
            if (error !== null) {
                reject(error);
            }
            else {
                var searches = [];
                for (var i = 0; i < topTracks.track.length; i++) {
                    var track = topTracks.track[i];
                    var search = track.artist['#text'] + ' ' + track.name;
                    searches.push(search);
                }
                resolve(searches);
            }
        });
    });
}
/**
 *
 * YouTube ID
 * @desc run a youtube search based on a query string
 */
function youtubeID(search) {
    return Q.Promise(function (resolve, reject) {
        var numResults = 1;
        youTube.search(search, numResults, function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                var videoId = result.items[0].id.videoId;
                resolve(videoId);
            }
        });
    });
}
/**
 *
 * Recent Tracks
 *
 */
function recentTracks(params) {
    return Q.Promise(function (resolve, reject) {
        lastfmRecentTracks(params)
            .then(function (searches) {
            var result = [];
            for (var i = 0; i < searches.length; i++)
                (function (i) {
                    result.push(youtubeID(searches[i])
                        .then(function (id) {
                        return id;
                    }));
                })(i);
            resolve(Q.all(result));
        })["catch"](function (error) {
            reject(error);
        });
    });
}
exports.recentTracks = recentTracks;
/**
 *
 * Top Tracks
 * @desc grab last FM data and return an array of youtube ids
 * @access private
 *
 */
function topTracks(params) {
    // implement caching for top tracks overall
    return Q.Promise(function (resolve, reject) {
        lastfmTopTracks(params)
            .then(function (searches) {
            var result = [];
            for (var i = 0; i < searches.length; i++)
                (function (i) {
                    result.push(youtubeID(searches[i])
                        .then(function (id) {
                        return id;
                    }));
                })(i);
            resolve(Q.all(result));
        })["catch"](function (error) {
            reject(error);
        });
    });
}
exports.topTracks = topTracks;
