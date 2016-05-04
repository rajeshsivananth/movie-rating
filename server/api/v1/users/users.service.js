var usersQuery = require('./users.query'), jwt = require('jsonwebtoken'), config = require('./../../../config/environment');

function signin(req, res, next) {
  usersQuery.findUserById(req.body.userName).then(function(user) {
    console.log('user', user);
      if (!user) {
        res.status(401).send({
          'code': 401,
          'message': 'Unauthorizes to access.'
        });
      } else if (user) {

        // check if password matches
        if (user.password != req.body.password) {
          res.status(401).send({
            'code': 401,
            'message': 'Unauthorizes to access.'
          });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, config.secrets.session, {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          // return the information including token as JSON

          res.status(200).send({
            'code': 200,
            'success': true,
            'token': token
          });
        }
      }
    },
    function(err) {
      if (err) {
        console.error(err);
        res.status(500).send({
          'code': 500,
          'message': constants.HTTP_500_OOPS
        });
      }
    });
}

exports.signin = signin;
