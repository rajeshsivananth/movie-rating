var app = angular.module('MovieReview');
app.controller('MovieController', ['$scope', 'Movie', '$uibModal',function($scope, Movie, $uibModal){
  $scope.genres = ['Action', 'Drama', 'Horror'];
  $scope.movies = [];
  $scope.fetch_movies = function(genre){
    Movie.find_by_genre(genre)
    .then(function(data){
      $scope.movies = data.data.movies;
      console.log('movies of genre', genre, data.data);
    }, function(error){
      console.log('error', error);
    });
  };
  $scope.fetch_movies($scope.genres[0]);
  $scope.movie_preview = function(movie){
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'movie_preview.html',
      controller: 'MoviePreviewController',
      size: 'lg',
      windowClass: 'movie-window',
      resolve: {
        Movie: function () {
          return movie;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });
  };
    // alert('Review');
}]);
app.controller('MoviePreviewController', ['$scope', 'Movie','$uibModalInstance', '$sce',function($scope, Movie,$uibModalInstance, $sce){
  console.log(Movie);
  $scope.trailer = {
    code: '',
    url:''
  };
  $scope.Movie = Movie;
  $scope.trailer.code =  $sce.trustAsHtml(Movie.TrailerEmbedCode);
  Movie.TrailerLink = Movie.TrailerLink.replace('watch?v=','embed/');
  $scope.trailer.url =  $sce.trustAsResourceUrl(Movie.TrailerLink);

  $scope.ok = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
