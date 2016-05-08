var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MoviesSchema = new Schema({
    Id: String,
    ImdbId: String,
    OriginalTitle: String,
    Title: String,
    Description: String,
    TrailerLink: String,
    TrailerEmbedCode: String,
    Country: String,
    Region: String,
    Genre: String,
    RatingCount: Number,
    Rating: Number,
    CensorRating: String,
    ReleaseDate: String,
    Runtime: Number,
    Budget: Number,
    Revenue: Number,
    PosterPath: String
});

var Movies = mongoose.model('movies', MoviesSchema);

module.exports = Movies;
