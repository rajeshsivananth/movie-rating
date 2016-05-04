/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var bodyParser = require('body-parser');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});
mongoose.connection.once('connected', function() {
	console.log("Connected to database as "+config.mongo.uri);
});

// Populate DB with sample data
if (config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();

// limit the file size to 20 mb
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

// middlewares
// logging
var logger = require('./config/middlewares/logging');

var server = require('http').createServer(app);
require('./config/express')(app);
// TODO: Modify routes to include amqp after ETS integration spec is frozen
require('./routes')(app, config);

// Start server
server.listen(config.port, config.ip, function() {
  logger.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
