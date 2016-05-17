var app = angular.module('MovieReview', ['ui.router','ui.bootstrap']);
app.controller('MovieReviewController', ['$scope', '$state',function($scope, $state){
  $scope.sign_out = function(){
    window.localStorage.removeItem('mr_token');
    $state.go('login');
  };
  $scope.isLoggedIn = function(){
    // console.log('login status', window.localStorage.mr_token);
    if(window.localStorage.mr_token && window.localStorage.mr_token !==undefined){
      return true;
    }
    else{
      return false;
    }
  }
}]);
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
app.run(['$rootScope', '$state',function($rootScope, $state){
  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams){
    if(toState.name == 'movie'){
      if(!window.localStorage.mr_token){
        event.preventDefault();
        $state.go('login');
      }
    }
    else if(toState.name == 'login'){
      if(window.localStorage.mr_token){
        event.preventDefault();
        $state.go('movie');
      }
    }


  });
}]);
app.service("Auth",['$http',function($http){
  this.login = function(user){
    console.log('user', user);
    return $http.post('api/v1/users/signin',angular.toJson(user));
  };
}]);
app.service("Movie",['$http',function($http){
  this.find_by_genre = function(genre){
    console.log('genre', genre);
    return $http.get('api/v1/movies/'+genre);
  };
}])
