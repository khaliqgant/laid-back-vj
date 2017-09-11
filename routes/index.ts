import {Request, Response} from 'express';
import {Response as YoutubeResponse} from '../interfaces/Youtube';
import YoutubeAPI = require('../library/youtubeApi');

var express = require('express');
var router = express.Router();

router.get('/', function(req: Request, res: Response, next: Function) {

    YoutubeAPI.popular()
    .then(function(videos: string[]) {
        res.render('index', {
            title: 'Prep For Relaxation',
            intro: 'Authenticate via Spotify or Lastfm or just watch some videos right away',
            auth: true,
            videos: videos
        });
    })
    .catch(function(error: any) {
        res.json(error);
     });

});

module.exports = router;
