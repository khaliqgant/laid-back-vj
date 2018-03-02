import { Request, Response } from 'express';
import {
  User as UserResponse,
  Friends as FriendResponse,
} from '../interfaces/Lastfm';

import LastfmApi = require('../library/lastfmApi');

const express = require('express');

const router = express.Router();

router.get('/', (req: Request, res: Response, next: Function) => {

  res.json({
    title: 'Laid Back VJ: Watch your favorite music videos that you didn’t know existed',
  });

});

router.get(
  '/lastfm/user/:userId',
  (req: Request, res: Response, next: Function) => {

    const userId = req.params.userId;

    LastfmApi.user(userId)
      .then((userInfo: UserResponse) => {

        res.json(userInfo);

      })
      .catch((error: any) => {

        res.json(error);

      });

  },
);

router.get(
  '/lastfm/friends/:userId',
  (req: Request, res: Response, next: Function) => {

    const userId = req.params.userId;

    LastfmApi.friends(userId)
      .then((friends: FriendResponse) => {

        res.json(friends);

      })
      .catch((error: any) => {

        res.json(error);

      });

  },
);

module.exports = router;

