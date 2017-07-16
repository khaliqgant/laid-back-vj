"use strict";
/// <reference path="../typings/tsd.d.ts"/>
exports.__esModule = true;
var Video = require("../library/video");
var express = require('express');
var router = express.Router();
router.get('/test', function (req, res, next) {
    res.render('index', {
        title: 'Laid Back VJ' + ' - test',
        videos: ['5483ImCMSfQ', 'OFjQMDtwAbg']
    });
});
router.get('/*', function (req, res, next) {
    var userId = req.path.replace('/', '');
    Video.topTracks(userId)
        .then(function (videoIds) {
        res.render('index', {
            title: 'Laid Back VJ' + ' - ' + userId,
            videos: videoIds
        });
    });
});
module.exports = router;
