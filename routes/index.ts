import { Request, Response } from 'express';
import { Response as YoutubeResponse, Methods } from '../interfaces/Youtube';
import { RouteInfo } from '../interfaces/VideoQuery';

import Controller from '../controllers/youtube';

import YoutubeAPI = require('../library/youtubeApi');

const express = require('express');

const router = express.Router();

const youtube = new Controller();
const routes: any = youtube.getRoutes();

router.get('/', (req: Request, res: Response, next: Function) => {

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
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

module.exports = router;
