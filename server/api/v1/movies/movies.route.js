'use strict';

var express = require('express');
var movies = require('./movies.controller');
var router = express.Router();

router.get('/:genre', movies.getMovies);

module.exports = router;