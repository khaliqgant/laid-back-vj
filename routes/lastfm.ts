import {Request, Response} from 'express';
import Video = require('../library/video');

var express = require('express');
var router = express.Router();

const LIMIT = 25;


router.get('/test', function(req: Request, res: Response, next: Function) {
    res.render('index', {
        userId: 'khaliqgant',
        title: 'Laid Back VJ' + ' - test',
        videos: ['5483ImCMSfQ', 'OFjQMDtwAbg']
    });
});

/**
 *
 * Last Years Favorites
 * @desc route to grab the users top tracks from last year
 *
 */
router.get('/:userId/year', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '12month',
        limit: LIMIT
    };

    Video.topTracks(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Years Favorites',
            videos: videoIds
        });
    })
    .catch(function (error: any) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});

/**
 *
 * Last Months Favorites
 * @desc route to grab the users top tracks from last month
 *
 */
router.get('/:userId/month', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '1month',
        limit: LIMIT
    };

    Video.topTracks(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })
    .catch(function (error: any) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});

/**
 *
 * Recent
 * @desc videos from what the user listened to recently
 *
 */
router.get('/:userId/recent', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;
    const params = {
        user: userId,
        limit: LIMIT
    };

    Video.recentTracks(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })
    .catch(function (error: any) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});


router.get('/:userId/artists/week', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '7day',
        limit: LIMIT
    };

    Video.recentArtists(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })
    .catch(function (error: any) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});

router.get('/:userId/artists/month', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '1month',
        limit: LIMIT
    };

    Video.recentArtists(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })
    .catch(function (error: any) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});

router.get('/:userId/artists/three-month', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '3month',
        limit: LIMIT
    };

    Video.recentArtists(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })
    .catch(function (error: any) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});

router.get('/:userId/artists/year', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;
    const params = {
        user: userId,
        period: '12month',
        limit: LIMIT
    };

    Video.recentArtists(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })
    .catch(function (error: any) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});

router.get('/:userId/recommended', function(req: Request, res: Response, next: Function) {
    // http://www.last.fm/api/show/track.getSimilar
    res.render('notFound', {
        title: 'Laid Back VJ',
        error: {message: 'not implemented'}
    });
});

router.get('/:userId/friends-videos', function(req: Request, res: Response, next: Function) {
    // http://www.last.fm/api/show/user.getFriends
    res.render('notFound', {
        title: 'Laid Back VJ',
        error: {message: 'not implemented'}
    });
});

/**
 *
 * All Time Favorites
 * @desc route to grab the users top tracks from all time
 *
 */
router.get('/*', function(req: Request, res: Response, next: Function) {
    const userId = req.path.replace('/', '');
    const params = {
        user: userId,
        limit: LIMIT
    };

    Video.topTracks(params)
     .then(function(videoIds: string[]){
        res.render('index', {
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'All Time Favorites',
            videos: videoIds
        });
    })
    .catch(function (error: any) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});

module.exports = router;
