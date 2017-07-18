/// <reference path="../typings/tsd.d.ts"/>

import {Request, Response} from "express";
import LastfmApi = require('../library/lastfmApi');

var express = require('express');
var router = express.Router();

router.get('/lastfm/user/:userId', function(req: Request, res: Response, next: Function) {
    const userId = req.params.userId;

    LastfmApi.getUser(userId)
     .then(function(userInfo: any) {
         res.json(userInfo);
     })
     .catch(function(error: any) {
         res.json(error);
     });
});

module.exports = router;

