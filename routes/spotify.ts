import { Request, Response } from 'express';

import Video = require('../library/video');
import Controller = require('../controllers/spotify');

const express = require('express');
const querystring = require('querystring');

const router = express.Router();
const service = 'spotify';

router.get('/test', (req: Request, res: Response, next: Function) => {

  res.render('index', {
    filter: [],
    links: [],
    service,
    title: 'Laid Back VJ - test',
    userId: 'khaliqgant',
    videos: ['5483ImCMSfQ', 'OFjQMDtwAbg'],
  });

});


router.get('/callback', (req: Request, res: Response, next: Function) => {

  const code = req.query.code || null;
  const state = req.query.state || null;

  const result = Controller.setAccess(code, state);

  // handle this better
  // if (!result) {

  // res.redirect(`/#${
  // querystring.stringify({
  // error: 'state_mismatch',
  // })}`);

  // }
  result.then((info: any) => {

    // set playlists potentials server side
    res.redirect(`/spotify/${info.username}`);

  });

  // redirect here after retrieved and prep user for videos
  res.render('index', {
    filter: [],
    links: [],
    service,
    title: 'Laid Back VJ - test',
    userId: 'khaliqgant',
    videos: ['5483ImCMSfQ', 'OFjQMDtwAbg'],
  });

});

module.exports = router;
