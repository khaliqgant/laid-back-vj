"use strict";
/// <reference path='../typings/tsd.d.ts'/>
exports.__esModule = true;
var Q = require('q');
var config = require('../config.json');
var YoutubeAPI = require('../library/youtubeApi');
// @see https://github.com/nodenica/youtube-node
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey(config.youtube.apiKey);
/**
 *
 * Search
 * @desc run a youtube search based on a query string
 * @see https://developers.google.com/youtube/v3/docs/search/list
 * @access private
 *
 */
function search(search) {
    return Q.Promise(function (resolve, reject) {
        var numResults = 1;
        youTube.search(search.query, numResults, { type: 'video' }, function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                var videoId = result.items[0].id.videoId;
                var videoTitle = result.items[0].snippet.title;
                // perform some kind of similarity check?
                var artist = videoTitle.slice(0, videoTitle.indexOf('-'));
                ;
                resolve(videoId);
            }
        });
    });
}
exports.search = search;
