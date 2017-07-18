"use strict";
/// <reference path="../typings/tsd.d.ts"/>
exports.__esModule = true;
var Video = require("../library/video");
var express = require('express');
var router = express.Router();
var LIMIT = 25;
router.get('/test', function (req, res, next) {
    res.render('index', {
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
    Video.topTracks(userId)
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
