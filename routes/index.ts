import { Request, Response } from 'express';
import { Response as YoutubeResponse } from '../interfaces/Youtube';

import YoutubeAPI = require('../library/youtubeApi');

const express = require('express');

const router = express.Router();

router.get('/', (req: Request, res: Response, next: Function) => {

  YoutubeAPI.popular()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        intro: 'Authenticate via Spotify or Lastfm or just ' +
        'watch some videos right away',
        service: 'spotify',
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

module.exports = router;
