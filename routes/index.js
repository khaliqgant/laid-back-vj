"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YoutubeAPI = require("../library/youtubeApi");
const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
    YoutubeAPI.popular()
        .then((videos) => {
        res.render('index', {
            title: 'Prep For Relaxation',
            intro: 'Authenticate via Spotify or Lastfm or just watch some videos right away',
            auth: true,
            videos,
        });
    })
        .catch((error) => {
        res.json(error);
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map