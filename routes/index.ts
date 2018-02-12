import { Request, Response } from 'express';
import { Response as YoutubeResponse } from '../interfaces/Youtube';

import YoutubeAPI = require('../library/youtubeApi');

const express = require('express');

const router = express.Router();

router.get('/', (req: Request, res: Response, next: Function) => {

  YoutubeAPI.popular()
    .then((videos: string[]) => {

      res.render('index', {
        title: 'Prep For Relaxation',
        intro: 'Authenticate via Spotify or Lastfm or just watch some videos right away',
        auth: true,
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

module.exports = router;
