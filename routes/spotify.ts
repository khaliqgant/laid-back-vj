import { Request, Response } from 'express';

import Video = require('../library/video');
// import Controller = require('../controllers/spotify');

const express = require('express');

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


router.get('/login', (req: Request, res: Response, next: Function) => {

  res.render('index', {
    filter: routes.recent.filter,
    links: Controller.getLinks('recent'),
    service,
    title: 'Laid Back VJ - test',
    userId: 'khaliqgant',
    videos: ['5483ImCMSfQ', 'OFjQMDtwAbg'],
  });

});
