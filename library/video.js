"use strict";
/// <reference path='../typings/tsd.d.ts'/>
exports.__esModule = true;
var Q = require('q');
var config = require('../config.json');
var LastfmAPI = require('../library/lastfmApi');
var YoutubeAPI = require('../library/youtubeApi');
/**
 *
 * Recent Tracks
 *
 */
function recentTracks(params) {
    return Q.Promise(function (resolve, reject) {
        LastfmAPI.recentTracks(params)
            .then(function (searches) {
            var result = [];
            for (var i = 0; i < searches.length; i++)
                (function (i) {
                    result.push(YoutubeAPI.search(searches[i])
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
function recentArtists(params) {
    return Q.Promise(function (resolve, reject) {
        LastfmAPI.recentArtists(params)
            .then(function (searches) {
            var result = [];
            for (var i = 0; i < searches.length; i++)
                (function (i) {
                    result.push(YoutubeAPI.search(searches[i])
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
exports.recentArtists = recentArtists;
/**
 *
 * Top Tracks
 * @desc grab last FM data and return an array of youtube ids
 *
 */
function topTracks(params) {
    // implement caching for top tracks overall
    return Q.Promise(function (resolve, reject) {
        LastfmAPI.topTracks(params)
            .then(function (searches) {
            var result = [];
            for (var i = 0; i < searches.length; i++)
                (function (i) {
                    result.push(YoutubeAPI.search(searches[i])
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
