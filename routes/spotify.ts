import { Request, Response } from 'express';

import Controller from '../controllers/spotify';

import Video = require('../library/video');

const express = require('express');
const querystring = require('querystring');

const router = express.Router();
const service = 'spotify';

const spotify = new Controller();
const routes = spotify.getRoutes();

router.get('/test', (req: Request, res: Response, next: Function) => {

  res.render('index', {
    filter: [],
    links: [],
    service,
    title: 'Laid Back VJ - test',
    userId: 'khaliqgant',
    videos: ['5483ImCMSfQ', 'OFjQMDtwAbg'],
  });

});

router.get('/callback', (req: Request, res: Response, next: Function) => {

  const code = req.query.code || null;
  const state = req.query.state || null;

  const result = spotify.setAccess(code, state);

  if (!result) {

    res.render('notFound', {
      error: 'Issue logging you in via Spotify',
    });

    return;

  }

  result.then((userId: any) => {

    res.redirect(`/spotify/${userId}`);

  });

});

router.get('/:userId/recent', (req: Request, res: Response, next: Function) => {

  const userId = req.params.userId;

  spotify.recentTracks()
    .then((videoIds: string) => {

      res.render('index', {
        filter: routes.recent.filter,
        links: spotify.getLinks('recent'),
        service,
        title: `Laid Back VJ - ${userId}`,
        userId,
        videos: videoIds,
      });

    })
    .catch((error: any) => {

      res.render('notFound', {
        error,
        title: 'Laid Back VJ',
      });

    });

});

router.get('/:userId/saved', (req: Request, res: Response, next: Function) => {

  const userId = req.params.userId;

  spotify.savedTracks()
    .then((videoIds: string) => {

      res.render('index', {
        filter: routes.saved.filter,
        links: spotify.getLinks('saved'),
        service,
        title: `Laid Back VJ - ${userId}`,
        userId,
        videos: videoIds,
      });

    })
    .catch((error: any) => {

      res.render('notFound', {
        error,
        title: 'Laid Back VJ',
      });

    });

});

router.get('/*', (req: Request, res: Response, next: Function) => {

  const userId = req.path.replace('/', '');

  spotify.topTracks()
    .then((videoIds: string) => {

      res.render('index', {
        filter: routes.top.filter,
        links: spotify.getLinks('top'),
        service,
        title: `Laid Back VJ - ${userId}`,
        userId,
        videos: videoIds,
      });

    })
    .catch((error: any) => {

      res.render('notFound', {
        error,
        title: 'Laid Back VJ',
      });

    });

});

module.exports = router;
