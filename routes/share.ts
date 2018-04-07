import { Request as _Request, Response as _Response } from 'express';
import { Response as _ShareResponse } from '../interfaces/Share';

import Controller from '../controllers/share';
import SpotifyController from '../controllers/spotify';

const express = require('express');

const router = express.Router();

const share = new Controller();
const spotify = new SpotifyController();

const spotifyAuthUrl = spotify.getAuthorizeUrl();

router.get('/:hash', (req: _Request, res: _Response, _next: Function) => {

  const hash: string = req.params.hash;
  const videoInfo: _ShareResponse = share.decode(hash);

  res.render('index', {
    auth: true,
    filter: videoInfo.filter,
    links: share.getLinks(''),
    service: 'youtube',
    shareMessage: videoInfo.message,
    spotifyAuthUrl,
    title: 'Prep For Relaxation',
    videos: videoInfo.videos,
  });

});


module.exports = router;

