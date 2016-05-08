var app = angular.module('MovieReview', ['ui.router']);
app.config(['$stateProvider','$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state('login',{
      url: '/login',
      templateUrl: 'app/login/partials/login.html',
      controller: 'LoginController',
    })
    .state('movie',{
      url: '/movies',
      templateUrl: 'app/movie/partials/movie.html',
      controller: 'MovieController',
    })
}]);
app.services("Auth",['$http',function($http){
  this.login = function(user){
    return $http.post(,angular.toJson(user));
  };
}])
