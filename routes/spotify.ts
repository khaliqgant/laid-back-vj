import { Request as _Request, Response as _Response } from 'express';

import { UserResponse as _UserResponse } from '../interfaces/Spotify';
import Controller from '../controllers/spotify';

const express = require('express');

const router = express.Router();
const service = 'spotify';

const spotify = new Controller();
const routes = spotify.getRoutes();

router.get('/test', (req: _Request, res: _Response, _next: Function) => {

  res.render('index', {
    filter: [],
    links: [],
    service,
    title: 'Laid Back VJ - test',
    userId: 'khaliqgant',
    videos: ['5483ImCMSfQ', 'OFjQMDtwAbg'],
  });

});

router.get('/callback', (req: _Request, res: _Response, _next: Function) => {

  const code = req.query.code || null;
  const state = req.query.state || null;

  const result = spotify.setAccess(code, state);

  if (!result) {

    res.render('notFound', {
      error: 'Issue logging you in via Spotify',
    });

    return;

  }

  result.then((user: _UserResponse) => {

    const userId: string = user.body.id;
    res.redirect(`/spotify/${userId}`);

  });

});

router.get(
  '/:userId/recent',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;

    spotify.recent()
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

  },
);

router.get(
  '/:userId/saved',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;

    spotify.saved()
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

  },
);

router.get(
  '/:userId/artists',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;

    spotify.artists()
      .then((videoIds: string) => {

        res.render('index', {
          filter: routes.artists.filter,
          links: spotify.getLinks('artists'),
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

  },
);

router.get('/*', (req: _Request, res: _Response, _next: Function) => {

  const userId = req.path.replace('/', '');

  spotify.top()
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
