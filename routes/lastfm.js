"use strict";
exports.__esModule = true;
var Video = require("../library/video");
var express = require('express');
var router = express.Router();
//const LIMIT = 25;
var LIMIT = 5;
router.get('/test', function (req, res, next) {
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
router.get('/:userId/year', function (req, res, next) {
    var userId = req.params.userId;
    var params = {
        user: userId,
        period: '12month',
        limit: LIMIT
    };
    Video.topTracks(params)
        .then(function (videoIds) {
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Years Favorites',
            videos: videoIds
        });
    })["catch"](function (error) {
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
router.get('/:userId/month', function (req, res, next) {
    var userId = req.params.userId;
    var params = {
        user: userId,
        period: '1month',
        limit: LIMIT
    };
    Video.topTracks(params)
        .then(function (videoIds) {
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })["catch"](function (error) {
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
router.get('/:userId/recent', function (req, res, next) {
    var userId = req.params.userId;
    var params = {
        user: userId,
        limit: LIMIT
    };
    Video.recentTracks(params)
        .then(function (videoIds) {
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })["catch"](function (error) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});
router.get('/:userId/artists/week', function (req, res, next) {
    var userId = req.params.userId;
    var params = {
        user: userId,
        period: '7day',
        limit: LIMIT
    };
    Video.recentArtists(params)
        .then(function (videoIds) {
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })["catch"](function (error) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});
router.get('/:userId/artists/month', function (req, res, next) {
    var userId = req.params.userId;
    var params = {
        user: userId,
        period: '1month',
        limit: LIMIT
    };
    Video.recentArtists(params)
        .then(function (videoIds) {
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })["catch"](function (error) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});
router.get('/:userId/artists/three-month', function (req, res, next) {
    var userId = req.params.userId;
    var params = {
        user: userId,
        period: '3month',
        limit: LIMIT
    };
    Video.recentArtists(params)
        .then(function (videoIds) {
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })["catch"](function (error) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});
router.get('/:userId/artists/year', function (req, res, next) {
    var userId = req.params.userId;
    var params = {
        user: userId,
        period: '12month',
        limit: LIMIT
    };
    Video.recentArtists(params)
        .then(function (videoIds) {
        res.render('index', {
            userId: userId,
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'Last Months Favorites',
            videos: videoIds
        });
    })["catch"](function (error) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});
router.get('/:userId/recommended', function (req, res, next) {
    // http://www.last.fm/api/show/track.getSimilar
    res.render('notFound', {
        title: 'Laid Back VJ',
        error: { message: 'not implemented' }
    });
});
router.get('/:userId/friends-videos', function (req, res, next) {
    // http://www.last.fm/api/show/user.getFriends
    res.render('notFound', {
        title: 'Laid Back VJ',
        error: { message: 'not implemented' }
    });
});
/**
 *
 * All Time Favorites
 * @desc route to grab the users top tracks from all time
 *
 */
router.get('/*', function (req, res, next) {
    var userId = req.path.replace('/', '');
    var params = {
        user: userId,
        limit: LIMIT
    };
    Video.topTracks(params)
        .then(function (videoIds) {
        res.render('index', {
            title: 'Laid Back VJ' + ' - ' + userId,
            filter: 'All Time Favorites',
            videos: videoIds
        });
    })["catch"](function (error) {
        res.render('notFound', {
            title: 'Laid Back VJ',
            error: error
        });
    });
});
module.exports = router;
