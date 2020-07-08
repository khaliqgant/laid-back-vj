import { Request as _Request, Response as _Response } from 'express';
import {
  Response as _YoutubeResponse,
  Methods as _Methods,
} from '../interfaces/Youtube';
import { RouteInfo as _RouteInfo } from '../interfaces/VideoQuery';
import { Playlist as _Playlist } from '../interfaces/Share';


import { Storage as storage } from '../library/storage';

import YoutubeController from '../controllers/youtube';
import SpotifyController from '../controllers/spotify';
import LastFmController from '../controllers/lastfm';

import Video = require('../library/video');

const express = require('express');

const router = express.Router();
const Storage = storage.getInstance();

const youtube = new YoutubeController();
const spotify = new SpotifyController();
const lastfm = new LastFmController();
const year = new Date().getFullYear();

router.get('/', (req: _Request, res: _Response, _next: Function) => {

  const spotifyAuthUrl = spotify.getAuthorizeUrl();
  const route: _RouteInfo = youtube.random();

  const method: (keyof _Methods) = route.method;

  // hack for dynamic method calling
  (Video as any)[method]()
    .then((videos: _Playlist[]) => {

      Storage.setPlaylist(videos);

      res.render('index', {
        auth: true,
        filter: route.filter,
        hash: Storage.getHash(),
        intro: true,
        lastfmUser: lastfm.getUser(req),
        links: youtube.getLinks(route.method),
        service: 'youtube',
        spotifyAuthUrl,
        title: 'Prep For Relaxation',
        videos,
        year,
      });

    })
    .catch((error: Error) => {

      res.json(error);

    });

});

module.exports = router;
