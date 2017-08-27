/// <reference path='../typings/tsd.d.ts'/>

import {Request, Response} from 'express';
import {User as UserResponse, Friends as FriendResponse} from '../interfaces/Lastfm'
import LastfmApi = require('../library/lastfmApi');

var express = require('express');
var router = express.Router();

router.get('/lastfm/user/:userId', function(req: Request, res: Response, next: Function) {

    const userId = req.params.userId;

    LastfmApi.user(userId)
     .then(function(userInfo: UserResponse) {
         res.json(userInfo);
     })
     .catch(function(error: any) {
         res.json(error);
     });

});

router.get('/lastfm/friends/:userId', function(req: Request, res: Response, next: Function) {

    const userId = req.params.userId;

    LastfmApi.friends(userId)
     .then(function(friends: FriendResponse) {
         res.json(friends);
     })
     .catch(function(error: any) {
         res.json(error);
     });

});

module.exports = router;

