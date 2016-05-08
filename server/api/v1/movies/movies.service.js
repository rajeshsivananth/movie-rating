var moviesQuery = require('./movies.query'), config = require('./../../../config/environment');

function getMovies(req, res, next) {
    moviesQuery.findMoviesByGenre(req.params.genre).then(function (movies) {
        if (movies && movies.length > 0) {
            res.status(200).send({
                code: 200,
                movies: movies
            });
        } else {
            res.status(404).send({
                code: 404,
                message: 'Not found.'
            });
        }
    }, function (err) {
        res.status(500).send({
            code: 500,
            message: 'Something went wrong.'
        });
    });
}

function getAllMovies() {
    return moviesQuery.findAllMovies();
}



function saveMovies(movies){
    moviesQuery.saveMovies(movies);
}

exports.getMovies = getMovies;
exports.saveMovies = saveMovies;
exports.getAllMovies = getAllMovies;
