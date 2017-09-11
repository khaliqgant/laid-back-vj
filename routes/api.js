"use strict";
exports.__esModule = true;
var LastfmApi = require("../library/lastfmApi");
var express = require('express');
var router = express.Router();
router.get('/lastfm/user/:userId', function (req, res, next) {
    var userId = req.params.userId;
    LastfmApi.user(userId)
        .then(function (userInfo) {
        res.json(userInfo);
    })["catch"](function (error) {
        res.json(error);
    });
});
router.get('/lastfm/friends/:userId', function (req, res, next) {
    var userId = req.params.userId;
    LastfmApi.friends(userId)
        .then(function (friends) {
        res.json(friends);
    })["catch"](function (error) {
        res.json(error);
    });
});
module.exports = router;
