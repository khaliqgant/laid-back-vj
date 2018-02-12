"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Video = require("../library/video");
const express = require('express');
const router = express.Router();
const LIMIT = 25;
router.get('/test', (req, res, next) => {
    res.render('index', {
        userId: 'khaliqgant',
        title: 'Laid Back VJ' + ' - test',
        videos: ['5483ImCMSfQ', 'OFjQMDtwAbg'],
    });
});
/**
 *
 * Last Years Favorites
 * @desc route to grab the users top tracks from last year
 *
 */
router.get('/:userId/year', (req, res, next) => {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '12month',
        limit: LIMIT,
    };
    Video.topTracks(params)
        .then((videoIds) => {
        res.render('index', {
            userId,
            title: `${'Laid Back VJ' + ' - '}${userId}`,
            filter: 'Last Years Favorites',
            videos: videoIds,
        });
    })
        .catch((error) => {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error,
        });
    });
});
/**
 *
 * Last Months Favorites
 * @desc route to grab the users top tracks from last month
 *
 */
router.get('/:userId/month', (req, res, next) => {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '1month',
        limit: LIMIT,
    };
    Video.topTracks(params)
        .then((videoIds) => {
        res.render('index', {
            userId,
            title: `${'Laid Back VJ' + ' - '}${userId}`,
            filter: 'Last Months Favorites',
            videos: videoIds,
        });
    })
        .catch((error) => {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error,
        });
    });
});
/**
 *
 * Recent
 * @desc videos from what the user listened to recently
 *
 */
router.get('/:userId/recent', (req, res, next) => {
    const userId = req.params.userId;
    const params = {
        user: userId,
        limit: LIMIT,
    };
    Video.recentTracks(params)
        .then((videoIds) => {
        res.render('index', {
            userId,
            title: `${'Laid Back VJ' + ' - '}${userId}`,
            filter: 'Last Months Favorites',
            videos: videoIds,
        });
    })
        .catch((error) => {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error,
        });
    });
});
router.get('/:userId/artists/week', (req, res, next) => {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '7day',
        limit: LIMIT,
    };
    Video.recentArtists(params)
        .then((videoIds) => {
        res.render('index', {
            userId,
            title: `${'Laid Back VJ' + ' - '}${userId}`,
            filter: 'Last Months Favorites',
            videos: videoIds,
        });
    })
        .catch((error) => {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error,
        });
    });
});
router.get('/:userId/artists/month', (req, res, next) => {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '1month',
        limit: LIMIT,
    };
    Video.recentArtists(params)
        .then((videoIds) => {
        res.render('index', {
            userId,
            title: `${'Laid Back VJ' + ' - '}${userId}`,
            filter: 'Last Months Favorites',
            videos: videoIds,
        });
    })
        .catch((error) => {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error,
        });
    });
});
router.get('/:userId/artists/three-month', (req, res, next) => {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '3month',
        limit: LIMIT,
    };
    Video.recentArtists(params)
        .then((videoIds) => {
        res.render('index', {
            userId,
            title: `${'Laid Back VJ' + ' - '}${userId}`,
            filter: 'Last Months Favorites',
            videos: videoIds,
        });
    })
        .catch((error) => {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error,
        });
    });
});
router.get('/:userId/artists/year', (req, res, next) => {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '12month',
        limit: LIMIT,
    };
    Video.recentArtists(params)
        .then((videoIds) => {
        res.render('index', {
            userId,
            title: `${'Laid Back VJ' + ' - '}${userId}`,
            filter: 'Last Months Favorites',
            videos: videoIds,
        });
    })
        .catch((error) => {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error,
        });
    });
});
router.get('/:userId/recommended', (req, res, next) => {
    // http://www.last.fm/api/show/track.getSimilar
    res.render('notFound', {
        title: 'Laid Back VJ',
        error: { message: 'not implemented' },
    });
});
router.get('/:userId/friends-videos', (req, res, next) => {
    // http://www.last.fm/api/show/user.getFriends
    res.render('notFound', {
        title: 'Laid Back VJ',
        error: { message: 'not implemented' },
    });
});
/**
 *
 * All Time Favorites
 * @desc route to grab the users top tracks from all time
 *
 */
router.get('/*', (req, res, next) => {
    const userId = req.path.replace('/', '');
    const params = {
        user: userId,
        limit: LIMIT,
    };
    Video.topTracks(params)
        .then((videoIds) => {
        res.render('index', {
            title: `${'Laid Back VJ' + ' - '}${userId}`,
            filter: 'All Time Favorites',
            videos: videoIds,
        });
    })
        .catch((error) => {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error,
        });
    });
});
module.exports = router;
//# sourceMappingURL=lastfm.js.map