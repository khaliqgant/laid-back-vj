"use strict";
/// <reference path='../typings/tsd.d.ts'/>
exports.__esModule = true;
var Q = require('q');
var config = require('../config.json');
// @see https://github.com/maxkueng/node-lastfmapi
var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
    'api_key': config.lastfm.apiKey,
    'secret': config.lastfm.secret
});
/**
 *
 *
 * @desc
 * @see
 *
 *
 */
function getUser(userId) {
    return Q.Promise(function (resolve, reject) {
        lfm.user.getInfo(userId, function (error, userInfo) {
            if (error !== null) {
                reject(error);
            }
            else {
                resolve(userInfo);
            }
        });
    });
}
exports.getUser = getUser;
