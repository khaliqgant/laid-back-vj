/// <reference path="../typings/tsd.d.ts"/>

import {Request, Response} from "express";
import Video = require('../library/video');

var express = require('express');
var router = express.Router();




router.get('/test', function(req: Request, res: Response, next: Function) {
    res.render('index', {
        title: 'Laid Back VJ' + ' - test',
        videos: ['5483ImCMSfQ', 'OFjQMDtwAbg']
    });
});

router.get('/*', function(req: Request, res: Response, next: Function) {
    const userId = req.path.replace('/', '');

    Video.topTracks(userId)
     .then(function(videoIds){
        res.render('index', {
            title: 'Laid Back VJ' + ' - ' + userId,
            videos: videoIds
        });
    })
});

module.exports = router;
