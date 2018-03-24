import { Request as _Request, Response as _Response } from 'express';
import {
  User as _FMUserResponse,
  Friends as _FriendResponse,
} from '../interfaces/Lastfm';
import { UserResponse as _SpotUserResponse } from '../interfaces/Spotify';

import { SpotifyAPI as spotifyApi } from '../library/spotifyApi';

import LastfmApi = require('../library/lastfmApi');

const SpotifyAPI = spotifyApi.getInstance();

const express = require('express');

const router = express.Router();

router.get('/', (req: _Request, res: _Response, _next: Function) => {

  res.json({
    title: `Laid Back VJ: Watch your favorite
    music videos that you didn’t know existed`,
  });

});

router.get(
  '/lastfm/user/:userId',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;

    LastfmApi.user(userId)
      .then((userInfo: _FMUserResponse) => {

        res.json(userInfo);

      })
      .catch((error: any) => {

        res.json(error);

      });

  },
);

router.get(
  '/lastfm/friends/:userId',
  (req: _Request, res: _Response, _next: Function) => {

    const userId = req.params.userId;

    LastfmApi.friends(userId)
      .then((friends: _FriendResponse) => {

        res.json(friends);

      })
      .catch((error: any) => {

        res.json(error);

      });

  },
);

router.get(
  '/spotify/user',
  (req: _Request, res: _Response, _next: Function) => {

    SpotifyAPI.getInfo()
      .then((user: _SpotUserResponse) => {

        res.json(user.body);

      })
      .catch((error: any) => {

        res.json(error);

      });

  },
);

module.exports = router;

