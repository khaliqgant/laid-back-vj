/// <reference path="../typings/tsd.d.ts"/>

import {Request, Response} from "express";

var express = require('express');
var router = express.Router();

const config = require('../config.json');

const LastfmAPI = require('lastfmapi');
const lfm = new LastfmAPI({
    'api_key' : config.lastfm.apiKey,
    'secret' : config.lastfm.secret
});

var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey(config.youtube.apiKey);


router.get('/test', function(req: Request, res: Response, next: Function) {
    res.render('index', {
        title: 'Laid Back VJ' + ' - test',
    });
});

router.get('/*', function(req: Request, res: Response, next: Function) {
    const id = req.path.replace('/', '');

    let params = {
        user: id
    };

    // make this promise based
    lfm.user.getTopTracks(params, function(err: any, topTracks: any){
        const firstTrack = topTracks.track[0];
        const trackInfo = {
            name: firstTrack.name,
            artist: firstTrack.artist.name
        };

        youTube.search(trackInfo.artist + ' ' + trackInfo.name, 2, function(error: any, result: any) {
            if (error) {
                console.log(error);
            }
            else {
                let firstVideoId = result.items[0].id.videoId;
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
