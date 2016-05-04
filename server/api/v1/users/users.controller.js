var usersService = require('./users.service'), logger = require('./../../../config/middlewares/logging');

function signin(req, res, next) {
  logger.log('info', 'roleSignin %s %j %j', req.body.userName, req.body.userName, req.params, {});
  usersService.signin(req, res, next);
}

exports.signin = signin;
