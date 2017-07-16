"use strict";
/// <reference path="../typings/tsd.d.ts"/>
exports.__esModule = true;
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Laid Back VJ' });
});
module.exports = router;
