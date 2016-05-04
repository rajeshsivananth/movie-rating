/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path'),
  when = require('when');

var logger = require('./config/middlewares/logging');

module.exports = function(app, config) {

  // Insert routes below

  // CORS Support
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // TODO: auth check
  /* var requireAuth = function(req, res, next) {
    // 'dtoken', 'userid' is required for further process
    if (!req.body.dtoken || (req.params.userID || req.params.driverID || req.params.riderID)) {
      // missing identifier 302
      // res.end();
    }

    // validate mongo collection for a 'userid', 'dtoken' login validity time.
    // valid user check.
    // if not a valid request then call res.end() here.

    // if it's a valid request then invoke next()
    next();
  };

  // users
  // app.use(['/api/v1/users/*', '/api/v1/rider/*', '/api/v1/driver/*', '/api/v1/payment/*'], requireAuth);
*/

  require('./api/v1')(app);


  // error handling
  // 500, unhandled errors
  app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send({
      'code': 500,
      'message': 'Something went wrong.'
    });
  });

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  app.route('/:url(api|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
