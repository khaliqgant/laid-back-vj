import { Request, Response } from 'express';

import Video = require('../library/video');
import Controller = require('../controllers/lastfm');

const express = require('express');

const router = express.Router();

const LIMIT = 25;

const service = 'lastfm';

const routes = Controller.getRoutes();

router.get('/test', (req: Request, res: Response, next: Function) => {

  res.render('index', {
    filter: routes.recent.filter,
    links: Controller.getLinks('recent'),
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
router.get('/:userId/year', (req: Request, res: Response, next: Function) => {

  const userId = req.params.userId;
  const params = {
    limit: LIMIT,
    period: '12month',
    user: userId,
  };

  Video.topTracks(params)
    .then((videoIds: string[]) => {

      res.render('index', {
        filter: routes.year.filter,
        links: Controller.getLinks('year'),
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

/**
 *
 * Last Months Favorites
 * @desc route to grab the users top tracks from last month
 *
 */
router.get('/:userId/month', (req: Request, res: Response, next: Function) => {

  const userId = req.params.userId;
  const params = {
    limit: LIMIT,
    period: '1month',
    user: userId,
  };

  Video.topTracks(params)
    .then((videoIds: string[]) => {

      res.render('index', {
        filter: routes.month.filter,
        links: Controller.getLinks('month'),
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

/**
 *
 * Recent
 * @desc videos from what the user listened to recently
 *
 */
router.get('/:userId/recent', (req: Request, res: Response, next: Function) => {

  const userId = req.params.userId;
  const params = {
    limit: LIMIT,
    user: userId,
  };

  Video.recentTracks(params)
    .then((videoIds: string[]) => {

      res.render('index', {
        filter: routes.recent.filter,
        links: Controller.getLinks('recent'),
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


router.get(
  '/:userId/artists/week',
  (req: Request, res: Response, next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '7day',
      user: userId,
    };

    Video.recentArtists(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.artists.week.filter,
          links: Controller.getLinks('artists', 'week'),
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
  (req: Request, res: Response, next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '1month',
      user: userId,
    };

    Video.recentArtists(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.artists.month.filter,
          links: Controller.getLinks('artists', 'month'),
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
  (req: Request, res: Response, next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '3month',
      user: userId,
    };

    Video.recentArtists(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.artists.threeMonth.filter,
          links: Controller.getLinks('artists', 'threeMonth'),
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
  (req: Request, res: Response, next: Function) => {

    const userId = req.params.userId;
    const params = {
      limit: LIMIT,
      period: '12month',
      user: userId,
    };

    Video.recentArtists(params)
      .then((videoIds: string[]) => {

        res.render('index', {
          filter: routes.artists.year.filter,
          links: Controller.getLinks('artists', 'year'),
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
  (req: Request, res: Response, next: Function) => {

  // http://www.last.fm/api/show/track.getSimilar
    res.render('notFound', {
      error: { message: 'not implemented' },
      service,
      title: 'Laid Back VJ',
    });

  },
);

router.get(
  '/:userId/friends-videos',
  (req: Request, res: Response, next: Function) => {

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
router.get('/*', (req: Request, res: Response, next: Function) => {

  const userId = req.path.replace('/', '');
  const params = {
    limit: LIMIT,
    user: userId,
  };

  Video.topTracks(params)
    .then((videoIds: string[]) => {

      res.render('index', {
        filter: routes.allTime.filter,
        links: Controller.getLinks('allTime'),
        service,
        title: `Laid Back VJ - ${userId}`,
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
