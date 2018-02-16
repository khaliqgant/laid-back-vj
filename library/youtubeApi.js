"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require('q');
const config = require('../config.json');
const YoutubeAPI = require('../library/youtubeApi');
// @see https://github.com/nodenica/youtube-node
const YouTube = require('youtube-node');
const youTube = new YouTube();
youTube.setKey(config.youtube.apiKey);
/**
 *
 * Search
 * @desc run a youtube search based on a query string
 * @see https://developers.google.com/youtube/v3/docs/search/list
 *
 */
function search(searchOb) {
    return Q.Promise((resolve, reject) => {
        const numResults = 1;
        youTube.search(searchOb.query, numResults, { type: 'video' }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                if (result.items.length <= 0) {
                    reject(error);
                    return;
                }
                const videoId = result.items[0].id.videoId;
                const videoTitle = result.items[0].snippet.title;
                // perform some kind of similarity check?
                const artist = videoTitle.slice(0, videoTitle.indexOf('-'));
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
    const query = 'music videos vevo';
    const numResults = 25;
    const params = {
        order: 'viewCount',
        type: 'video',
    };
    return Q.Promise((resolve, reject) => {
        youTube.search(query, numResults, params, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                const videoObjects = result.items;
                const videoIds = videoObjects.map((vid, i) => vid.id.videoId);
                resolve(videoIds);
            }
        });
    });
}
exports.popular = popular;
//# sourceMappingURL=youtubeApi.js.map