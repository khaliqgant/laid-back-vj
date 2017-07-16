"use strict";
/// <reference path='../typings/tsd.d.ts'/>
exports.__esModule = true;
var Q = require('q');
var config = require('../config.json');
var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
    'api_key': config.lastfm.apiKey,
    'secret': config.lastfm.secret
});
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey(config.youtube.apiKey);
/**
 *
 * Last FM ID
 * @desc grab top tracks from last FM and iterate through each to build a search
 *
 *
 */
function lastFmID(userId) {
    var params = {
        user: userId
    };
    return Q.Promise(function (resolve, reject) {
        lfm.user.getTopTracks(params, function (err, topTracks) {
            if (err !== null) {
                reject({ error: err });
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
 * YouTube ID
 * @desc run a youtube search based on a query string
 * @see https://github.com/nodenica/youtube-node
 */
function youtubeID(search) {
    return Q.Promise(function (resolve, reject) {
        var numResults = 1;
        youTube.search(search, numResults, function (error, result) {
            if (error) {
                reject({ error: error });
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
 * Top Tracks
 * @desc grab last FM data and return an array of youtube ids
 *
 */
function topTracks(userId) {
    return Q.Promise(function (resolve, reject) {
        lastFmID(userId)
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
        });
    });
}
exports.topTracks = topTracks;
