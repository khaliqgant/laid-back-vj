"use strict";
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
/**
 *
 * Popular
 * @desc grab the most popular music videos and return back the ids
 */
function popular() {
    var query = 'music videos vevo';
    var numResults = 25;
    var params = {
        type: 'video',
        order: 'viewCount'
    };
    return Q.Promise(function (resolve, reject) {
        youTube.search(query, numResults, params, function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                var videoObjects = result.items;
                var videoIds = videoObjects.map(function (vid, i) {
                    return vid.id.videoId;
                });
                resolve(videoIds);
            }
        });
    });
}
exports.popular = popular;
