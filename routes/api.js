"use strict";
/// <reference path="../typings/tsd.d.ts"/>
exports.__esModule = true;
var LastfmApi = require("../library/lastfmApi");
var express = require('express');
var router = express.Router();
router.get('/lastfm/user/:userId', function (req, res, next) {
    var userId = req.params.userId;
    LastfmApi.getUser(userId)
        .then(function (userInfo) {
        res.json(userInfo);
    })["catch"](function (error) {
        res.json(error);
    });
});
module.exports = router;
