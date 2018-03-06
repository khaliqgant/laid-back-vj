import { Request, Response } from 'express';
import { Response as YoutubeResponse } from '../interfaces/Youtube';

import Controller from '../controllers/youtube';

import YoutubeAPI = require('../library/youtubeApi');

const express = require('express');

const router = express.Router();

const youtube = new Controller();
const routes: any = youtube.getRoutes();

router.get('/', (req: Request, res: Response, next: Function) => {

  YoutubeAPI.popular()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: routes.popular.filter,
        intro: true,
        links: youtube.getLinks('popular'),
        service: '',
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

router.get('/near-me', (req: Request, res: Response, next: Function) => {

  const ip: any = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress;
  const test = '207.97.227.239';

  YoutubeAPI.nearMe(test)
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: routes.nearMe.filter,
        intro: true,
        links: youtube.getLinks('nearMe'),
        service: '',
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

router.get('/newest', (req: Request, res: Response, next: Function) => {

  YoutubeAPI.newest()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: routes.newest.filter,
        intro: true,
        links: youtube.getLinks('newest'),
        service: '',
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

router.get('/year', (req: Request, res: Response, next: Function) => {

  YoutubeAPI.year()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: routes.year.filter,
        intro: true,
        links: youtube.getLinks('year'),
        service: '',
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

router.get('/ten-years', (req: Request, res: Response, next: Function) => {

  YoutubeAPI.tenYear()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: routes.tenYear.filter,
        intro: true,
        links: youtube.getLinks('tenYear'),
        service: '',
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});


module.exports = router;
