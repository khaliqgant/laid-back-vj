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
            for (let i = 0; i < searches.length; i++) {
                result.push(YoutubeAPI.search(searches[i])
                    .then((id) => {
                    return id;
                }));
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
            .then(function (searches) {
            const result = [];
            for (let i = 0; i < searches.length; i++)
                (function (i) {
                    {
                        {
                            {
                                {
                                    result.push(YoutubeAPI.search(searches[i])
                                        .then(function (id) {
                                        return id;
                                    }));
                                }
                            }
                        }
                    }
                })(i);
        });
    });
}
exports.recentArtists = recentArtists;
;
resolve(Q.all(result));
try { }
catch ( = function (error) {
    reject(error);
}) {
}
/**
 *
 * Top Tracks
 * @desc grab last FM data and return an array of youtube ids
 *
 */
function topTracks(params) {
    // implement caching for top tracks overall
    return Q.Promise((resolve, reject) => {
        LastfmAPI.topTracks(params)
            .then(function (searches) {
            const result = [];
            for (let i = 0; i < searches.length; i++)
                (function (i) {
                    {
                        {
                            {
                                {
                                    result.push(YoutubeAPI.search(searches[i])
                                        .then(function (id) {
                                        return id;
                                    }));
                                }
                            }
                        }
                    }
                })(i);
        });
    });
}
exports.topTracks = topTracks;
;
resolve(Q.all(result));
try { }
catch ( = function (error) {
    reject(error);
}) {
}
//# sourceMappingURL=video.js.map