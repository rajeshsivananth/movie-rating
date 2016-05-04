var winston = require('winston');
var path = require('path');

var logger = new(winston.Logger)({
  transports: [
    new(winston.transports.DailyRotateFile)({
      name: 'transaction-file',
      filename: path.join(__dirname, '/logs/audit.log'),
      level: 'info',
      json: false,
      datePattern: '.dd-MM-yyyy',
      timestamp: function() {
        var currentdate = new Date();
        /*currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" +
          currentdate.getFullYear() + " " +*/
          return currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      },
      formatter: function(options) {
        // Return string will be passed to logger.
        return '[' + options.level.toUpperCase() + '] ' + options.timestamp() + ' ' +
          (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      }
    }),
    new(winston.transports.File)({
      name: 'error-file',
      filename: path.join(__dirname, '/logs/error.log'),
      level: 'error'
    })
  ]
});

module.exports = logger;
