import { Request as _Request, Response as _Response } from 'express';
import { Response as _YoutubeResponse } from '../interfaces/Youtube';
import { Playlist as _Playlist } from '../interfaces/Share';

import { Storage as storage } from '../library/storage';

import Controller from '../controllers/youtube';
import SpotifyController from '../controllers/spotify';
import LastfmController from '../controllers/lastfm';


import YoutubeAPI = require('../library/youtubeApi');

const express = require('express');

const router = express.Router();

const youtube = new Controller();
const spotify = new SpotifyController();
const lastfm = new LastfmController();
const routes: any = youtube.getRoutes();
const Storage = storage.getInstance();

const spotifyAuthUrl = spotify.getAuthorizeUrl();


router.get('/popular', (req: _Request, res: _Response, _next: Function) => {

  YoutubeAPI.popular()
    .then((videos: _Playlist[]) => {

      Storage.setPlaylist(videos);

      res.render('index', {
        auth: true,
        filter: routes.popular.filter,
        hash: Storage.getHash(),
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
    .then((videos: _Playlist[]) => {

      Storage.setPlaylist(videos);

      res.render('index', {
        filter: routes.artist.filter,
        hash: Storage.getHash(),
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
    .then((videos: _Playlist[]) => {

      Storage.setPlaylist(videos);

      res.render('index', {
        auth: true,
        filter: routes.newest.filter,
        hash: Storage.getHash(),
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
    .then((videos: _Playlist[]) => {

      Storage.setPlaylist(videos);

      res.render('index', {
        auth: true,
        filter: routes.year.filter,
        hash: Storage.getHash(),
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
    .then((videos: _Playlist[]) => {

      Storage.setPlaylist(videos);

      res.render('index', {
        auth: true,
        filter: routes.fiveYear.filter,
        hash: Storage.getHash(),
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

router.get('/top-charts', (req: _Request, res: _Response, _next: Function) => {

  lastfm.topCharts()
    .then((videos: _Playlist[]) => {

      Storage.setPlaylist(videos);

      res.render('index', {
        auth: true,
        filter: routes.topCharts.filter,
        hash: Storage.getHash(),
        intro: true,
        links: youtube.getLinks('topCharts'),
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
