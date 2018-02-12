"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LastfmApi = require("../library/lastfmApi");
const express = require('express');
const router = express.Router();
router.get('/lastfm/user/:userId', (req, res, next) => {
    const userId = req.params.userId;
    LastfmApi.user(userId)
        .then((userInfo) => {
        res.json(userInfo);
    })
        .catch((error) => {
        res.json(error);
    });
});
router.get('/lastfm/friends/:userId', (req, res, next) => {
    const userId = req.params.userId;
    LastfmApi.friends(userId)
        .then((friends) => {
        res.json(friends);
    })
        .catch((error) => {
        res.json(error);
    });
});
module.exports = router;
//# sourceMappingURL=api.js.map