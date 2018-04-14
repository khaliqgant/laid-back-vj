import { Request as _Request, Response as _Response } from 'express';
import { Response as _ShareResponse } from '../interfaces/Share';

import Controller from '../controllers/share';
import SpotifyController from '../controllers/spotify';

const express = require('express');

const router = express.Router();

const share = new Controller();
const spotify = new SpotifyController();

const spotifyAuthUrl = spotify.getAuthorizeUrl();

router.get('/playlist', (req: _Request, res: _Response, _next: Function) => {

  const hash: string = req.query.hash;
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

router.post('/api', (req: _Request, res: _Response, _next: Function) => {

  const shareInfo = JSON.parse(req.body.shareInfo);

  share.shorten(shareInfo).then((shareable: _ShortenResponse|string) => {

    const url = typeof shareable === 'string' ? shareable : shareable.data.url;
    res.json(url);

  });


});


module.exports = router;

