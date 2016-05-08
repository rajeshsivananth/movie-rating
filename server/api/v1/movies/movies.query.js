var Movie = require('./movies.model')

function findMoviesByGenre(genre){
  return Movie.find({
    'Genre': genre
  }).limit(5);
}

function findAllMovies(){
  return Movie.find();
}

function saveMovies(movies){
  Movie.create(movies, function(err, list){
      if(err){
          console.error(err);
      } else {
         console.log("saved successfully");
      }
  });
}

exports.findMoviesByGenre = findMoviesByGenre;
exports.saveMovies = saveMovies;
exports.findAllMovies = findAllMovies;