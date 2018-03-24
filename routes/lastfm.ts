import { Request as _Request, Response as _Response } from 'express';

import Controller from '../controllers/lastfm';

import Video = require('../library/video');

const express = require('express');

const router = express.Router();

const LIMIT = 25;

const service = 'lastfm';

const lastFm = new Controller();
const routes: any = lastFm.getRoutes();

router.get('/test', (req: _Request, res: _Response, _next: Function) => {

  res.render('index', {
    filter: routes.recent.filter,
    links: lastFm.getLinks('recent'),
    service,
    title: 'Laid Back VJ - test',
    userId: 'khaliqgant',
    videos: ['5483ImCMSfQ', 'OFjQMDtwAbg'],
  });

});

/**
 *
 * Last Years Favorites
 * @desc route to grab the users top tracks from last year
 *
 */
router.get(
  '/:userId/year',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '12month',
      user: userId,
    };

    lastFm.top(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.year.filter,
          lastfmUserId: userId,
          links: lastFm.getLinks('year'),
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

/**
 *
 * Last Months Favorites
 * @desc route to grab the users top tracks from last month
 *
 */
router.get(
  '/:userId/month',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '1month',
      user: userId,
    };

    lastFm.top(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.month.filter,
          lastfmUserId: userId,
          links: lastFm.getLinks('month'),
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

/**
 *
 * Recent
 * @desc videos from what the user listened to recently
 *
 */
router.get(
  '/:userId/recent',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      user: userId,
    };

    lastFm.recent(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.recent.filter,
          lastfmUserId: userId,
          links: lastFm.getLinks('recent'),
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
  '/:userId/artists/week',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '7day',
      user: userId,
    };

    lastFm.artists(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.artists.week.filter,
          lastfmUserId: userId,
          links: lastFm.getLinks('artists', 'week'),
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
  '/:userId/artists/month',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '1month',
      user: userId,
    };

    lastFm.artists(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.artists.month.filter,
          lastfmUserId: userId,
          links: lastFm.getLinks('artists', 'month'),
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
  '/:userId/artists/three-month',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '3month',
      user: userId,
    };

    lastFm.artists(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.artists.threeMonth.filter,
          lastfmUserId: userId,
          links: lastFm.getLinks('artists', 'threeMonth'),
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
  '/:userId/artists/year',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '12month',
      user: userId,
    };

    lastFm.artists(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.artists.year.filter,
          lastfmUserId: userId,
          links: lastFm.getLinks('artists', 'year'),
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
  '/:userId/recommended',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '12month',
      user: userId,
    };

    lastFm.recommended(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.recommended.filter,
          lastfmUserId: userId,
          links: lastFm.getLinks('recommended'),
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
  '/:userId/friends-videos',
  (req: _Request, res: _Response, _jnext: Function) => {

  // http://www.last.fm/api/show/user.getFriends
    res.render('notFound', {
      error: { message: 'not implemented' },
      service,
      title: 'Laid Back VJ',
    });

  },
);

/**
 *
 * All Time Favorites
 * @desc route to grab the users top tracks from all time
 *
 */
router.get('/*', (req: _Request, res: _Response, _next: Function) => {

  const userId = req.path.replace('/', '');
  const params = {
    limit: LIMIT,
    user: userId,
  };

  lastFm.setUser(res, userId);

  lastFm.top(params)
    .then((videoIds: string[]) => {

      res.render('index', {
        filter: routes.allTime.filter,
        lastfmUserId: userId,
        links: lastFm.getLinks('allTime'),
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
