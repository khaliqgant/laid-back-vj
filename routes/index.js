"use strict";
exports.__esModule = true;
var YoutubeAPI = require("../library/youtubeApi");
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    YoutubeAPI.popular()
        .then(function (videos) {
        res.render('index', {
            title: 'Prep For Relaxation',
            intro: 'Authenticate via Spotify or Lastfm or just watch some videos right away',
            auth: true,
            videos: videos
        });
    })["catch"](function (error) {
        res.json(error);
    });
});
module.exports = router;
