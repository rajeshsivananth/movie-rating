/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status).send({
    'code' : 404,
    'message': 'API endpoint not found.'
  });
};
