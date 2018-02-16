"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require('q');
const config = require('../config.json');
const LastfmAPI = require('../library/lastfmApi');
const YoutubeAPI = require('../library/youtubeApi');
/**
 *
 * Recent Tracks
 *
 */
function recentTracks(params) {
    return Q.Promise((resolve, reject) => {
        LastfmAPI.recentTracks(params)
            .then((searches) => {
            const result = [];
            for (const search of searches) {
                result.push(YoutubeAPI.search(search)
                    .then((id) => id));
            }
            resolve(Q.all(result));
        })
            .catch((error) => {
            reject(error);
        });
    });
}
exports.recentTracks = recentTracks;
function recentArtists(params) {
    return Q.Promise((resolve, reject) => {
        LastfmAPI.recentArtists(params)
            .then((searches) => {
            const result = [];
            for (const search of searches) {
                result.push(YoutubeAPI.search(search)
                    .then((id) => id));
            }
            resolve(Q.all(result));
        })
            .catch((error) => {
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
    return Q.Promise((resolve, reject) => {
        LastfmAPI.topTracks(params)
            .then((searches) => {
            const result = [];
            for (const search of searches) {
                result.push(YoutubeAPI.search(search)
                    .then((id) => id));
            }
            resolve(Q.all(result));
        })
            .catch((error) => {
            reject(error);
        });
    });
}
exports.topTracks = topTracks;
//# sourceMappingURL=video.js.map