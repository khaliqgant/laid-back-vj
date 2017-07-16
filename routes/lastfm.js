"use strict";
/// <reference path="../typings/tsd.d.ts"/>
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var config = require('../config.json');
var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
    'api_key': config.lastfm.apiKey,
    'secret': config.lastfm.secret
});
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey(config.youtube.apiKey);
router.get('/test', function (req, res, next) {
    res.render('index', {
        title: 'Laid Back VJ' + ' - test'
    });
});
router.get('/*', function (req, res, next) {
    var id = req.path.replace('/', '');
    var params = {
        user: id
    };
    // make this promise based
    lfm.user.getTopTracks(params, function (err, topTracks) {
        var firstTrack = topTracks.track[0];
        var trackInfo = {
            name: firstTrack.name,
            artist: firstTrack.artist.name
        };
        youTube.search(trackInfo.artist + ' ' + trackInfo.name, 2, function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                var firstVideoId = result.items[0].id.videoId;
                //console.log(JSON.stringify(result, null, 2));
                res.render('index', {
                    title: 'Laid Back VJ' + ' - ' + params.user,
                    tracks: trackInfo,
                    videoId: firstVideoId
                });
            }
        });
    });
});
module.exports = router;
