import {TrackQuery, ArtistQuery} from '../interfaces/VideoQuery';

const Q = require('q');
const config = require('../config.json');

const LastfmAPI = require('../library/lastfmApi');
const YoutubeAPI = require('../library/youtubeApi');


/**
 *
 * Recent Tracks
 *
 */
export function recentTracks(params: any): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {
        LastfmAPI.recentTracks(params)
         .then(function(searches: TrackQuery[]) {
            let result = [];
            for (let i = 0; i < searches.length; i++) (function(i) {
                result.push(YoutubeAPI.search(searches[i])
                    .then(function(id: string) {
                        return id;
                    }));
            })(i);

            resolve(Q.all(result));
         })
         .catch(function(error: any) {
            reject(error);
         });
    })

}


export function recentArtists(params: any): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {
        LastfmAPI.recentArtists(params)
         .then(function(searches: ArtistQuery[]) {
            let result = [];
            for (let i = 0; i < searches.length; i++) (function(i) {
                result.push(YoutubeAPI.search(searches[i])
                    .then(function(id: string) {
                        return id;
                    }));
            })(i);

            resolve(Q.all(result));
         })
         .catch(function(error: any) {
            reject(error);
         });
    })

}

/**
 *
 * Top Tracks
 * @desc grab last FM data and return an array of youtube ids
 *
 */
export function topTracks(params: any): Q.Promise<any> {

    // implement caching for top tracks overall
    return Q.Promise((resolve: Function, reject: Function) => {
        LastfmAPI.topTracks(params)
         .then(function(searches: TrackQuery[]) {
            let result = [];
            for (let i = 0; i < searches.length; i++) (function(i) {
                result.push(YoutubeAPI.search(searches[i])
                    .then(function(id: string) {
                        return id;
                    }));
            })(i);

            resolve(Q.all(result));
         })
         .catch(function(error: any) {
            reject(error);
         });
    })

}
