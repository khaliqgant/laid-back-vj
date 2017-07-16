/// <reference path='../typings/tsd.d.ts'/>

import {TopTracks as TopTrackResponse, Track as LastFmTrack} from '../interfaces/Lastfm';
import {Response as YoutubeResponse} from '../interfaces/Youtube';

const Q = require('q');
const config = require('../config.json');

const LastfmAPI = require('lastfmapi');
const lfm = new LastfmAPI({
    'api_key' : config.lastfm.apiKey,
    'secret' : config.lastfm.secret
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
function lastFmID(userId: string): Q.Promise<any> {

    let params = {
        user: userId
    };

    return Q.Promise((resolve: Function, reject: Function) => {
        lfm.user.getTopTracks(params, function(err: any, topTracks: TopTrackResponse) {
            if (err !== null) {
                reject({ error: err });
            } else {
                let searches = [];
                for (let i = 0; i < topTracks.track.length; i++)
                {
                    let track: LastFmTrack = topTracks.track[i];
                    let search = track.artist.name + ' ' + track.name;
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
function youtubeID(search: string): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {
        let numResults = 1;
        youTube.search(search, numResults, function(error: any, result: YoutubeResponse) {
            if (error) {
                reject({ error: error });
            } else {
                let videoId = result.items[0].id.videoId;
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
export function topTracks(userId: string): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {
        lastFmID(userId)
         .then(function(searches) {
            let result = [];
            for(let i = 0; i < searches.length; i++) (function(i) {
                result.push(youtubeID(searches[i])
                    .then(function(id) {
                        return id;
                    }));
            })(i);

            resolve(Q.all(result));
        });
    })

}
