'use strict';

var express = require('express');
var users = require('./users.controller');
var router = express.Router();

router.post('/signin', users.signin);

module.exports = router;
