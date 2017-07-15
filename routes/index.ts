/// <reference path="../typings/tsd.d.ts"/>

import {Request, Response} from "express";

var express = require('express');
var router = express.Router();

router.get('/', function(req: Request, res: Response, next: Function) {
  res.render('index', { title: 'Laid Back VJ' })
});

module.exports = router;
