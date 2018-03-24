import { Request as _Request, Response as _Response } from 'express';
import { Response as _YoutubeResponse } from '../interfaces/Youtube';

import Controller from '../controllers/youtube';
import SpotifyController from '../controllers/spotify';

import YoutubeAPI = require('../library/youtubeApi');

const express = require('express');

const router = express.Router();

const youtube = new Controller();
const spotify = new SpotifyController();
const routes: any = youtube.getRoutes();

const spotifyAuthUrl = spotify.getAuthorizeUrl();


router.get('/popular', (req: _Request, res: _Response, _next: Function) => {

  YoutubeAPI.popular()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: routes.popular.filter,
        intro: true,
        links: youtube.getLinks('popular'),
        service: 'youtube',
        spotifyAuthUrl,
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

router.get('/artist', (req: _Request, res: _Response, _next: Function) => {

  const artist: string = decodeURIComponent(req.query.name);

  YoutubeAPI.artist(artist)
    .then((videos: string[]) => {

      res.render('index', {
        filter: routes.artist.filter,
        links: youtube.getLinks('artist'),
        service: 'youtube',
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

router.get('/newest', (req: _Request, res: _Response, _next: Function) => {

  YoutubeAPI.newest()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: routes.newest.filter,
        intro: true,
        links: youtube.getLinks('newest'),
        service: 'youtube',
        spotifyAuthUrl,
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

router.get('/year', (req: _Request, res: _Response, _next: Function) => {

  YoutubeAPI.year()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: routes.year.filter,
        intro: true,
        links: youtube.getLinks('year'),
        service: 'youtube',
        spotifyAuthUrl,
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});

router.get('/five-years', (req: _Request, res: _Response, _next: Function) => {

  YoutubeAPI.fiveYear()
    .then((videos: string[]) => {

      res.render('index', {
        auth: true,
        filter: routes.fiveYear.filter,
        intro: true,
        links: youtube.getLinks('fiveYear'),
        service: 'youtube',
        spotifyAuthUrl,
        title: 'Prep For Relaxation',
        videos,
      });

    })
    .catch((error: any) => {

      res.json(error);

    });

});


module.exports = router;
