import { Request, Response } from 'express';
import { Response as YoutubeResponse, Methods } from '../interfaces/Youtube';
import { RouteInfo } from '../interfaces/VideoQuery';

import YoutubeController from '../controllers/youtube';
import SpotifyController from '../controllers/spotify';

import YoutubeAPI = require('../library/youtubeApi');

const express = require('express');

const router = express.Router();

const youtube = new YoutubeController();
const spotify = new SpotifyController();
const routes: any = youtube.getRoutes();

router.get('/', (req: Request, res: Response, next: Function) => {

  const spotifyAuthUrl = spotify.getAuthorizeUrl();
  const route: RouteInfo = youtube.random();

  const method: (keyof Methods) = route.method;

  // hack for dynamic method calling
  (YoutubeAPI as any)[method]()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: route.filter,
        intro: true,
        links: youtube.getLinks(route.method),
        service: 'youtube',
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
