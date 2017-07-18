/// <reference path="../typings/tsd.d.ts"/>

import {Request, Response} from "express";
import Video = require('../library/video');

var express = require('express');
var router = express.Router();

const LIMIT = 25;


router.get('/test', function(req: Request, res: Response, next: Function) {
    res.render('index', {
        title: 'Laid Back VJ' + ' - test',
        videos: ['5483ImCMSfQ', 'OFjQMDtwAbg']
    });
});

router.get('/:userId/year', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '12month',
        limit: LIMIT
    };

    Video.topTracks(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Years Favorites',
            videos: videoIds
        });
    })
});

router.get('/:userId/month', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '1month',
        limit: LIMIT
    };

    Video.topTracks(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })
});

router.get('/*', function(req: Request, res: Response, next: Function) {
    const userId = req.path.replace('/', '');
    const params = {
        user: userId,
        limit: LIMIT
    };

    Video.topTracks(userId)
     .then(function(videoIds: string[]){
        res.render('index', {
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'All Time Favorites',
            videos: videoIds
        });
    })
});

module.exports = router;
