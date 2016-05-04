/**
 * v1 routes
 */

'use strict';
var version = 'v1';

module.exports = function(app) {
  app.use('/api/' + version + '/users', function(req, res, next) {
    console.log('Going to call next() from main end-point to users end point.')
    next();
  }, require('./users/users.route.js'));
}
