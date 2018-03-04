import { Request, Response } from 'express';
import { Response as YoutubeResponse } from '../interfaces/Youtube';

import YoutubeAPI = require('../library/youtubeApi');
import SpotifyController = require('../controllers/spotify');

const express = require('express');

const router = express.Router();

router.get('/', (req: Request, res: Response, next: Function) => {

  const spotifyAuthUrl = SpotifyController.getAuthorizeUrl();

  YoutubeAPI.popular()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        intro: true,
        service: 'spotify',
        spotifyAuthUrl,
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

module.exports = router;
