/// <reference path='../typings/tsd.d.ts'/>

import {Tracks as TrackResponse, Track as LastFmTrack, User as UserResponse} from '../interfaces/Lastfm';
import {Response as YoutubeResponse} from '../interfaces/Youtube';

const Q = require('q');
const config = require('../config.json');

// @see https://github.com/maxkueng/node-lastfmapi
const LastfmAPI = require('lastfmapi');
const lfm = new LastfmAPI({
    'api_key' : config.lastfm.apiKey,
    'secret' : config.lastfm.secret
});


/**
 *
 *
 * @desc
 * @see
 *
 *
 */
export function getUser(userId: string): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {
        lfm.user.getInfo(userId, function(error: any, userInfo: UserResponse) {
            if (error !== null) {
                reject(error);
            } else {
                resolve(userInfo);
            }
        });
    });

}

