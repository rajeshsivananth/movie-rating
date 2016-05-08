var moviesService = require('./movies.service'), logger = require('./../../../config/middlewares/logging'),
http = require('request');

function getMovies(req, res, next) {
  logger.log('info', 'getMovies %s %j', req.body, req.params, {});
  moviesService.getMovies(req, res, next);
}

function saveMovies() {
  http.get("https://api.cinemalytics.com/v1/movie/year/2016/?auth_token=DFA248672A75A701CAE483D44B47478F", function (err, response, body) {
    if(err) {
      console.error(err);
    } else if(response){
      var moviesList = JSON.parse(body);
      moviesService.saveMovies(moviesList)
    }
  });
}

function getAllMovies() {
  return moviesService.getAllMovies();
}
exports.getMovies = getMovies;
exports.saveMovies = saveMovies;
exports.getAllMovies = getAllMovies;