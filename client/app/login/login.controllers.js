var app = angular.module('MovieReview');
app.controller('LoginController', ['$scope', function($scope){
    $scope.user = {
      email: '',
      password: ''
    };
    $scope.error = '';
    $scope.login = function(){
      console.log($scope.user);
      if(!$scope.user.email){
        $scope.error = "*Please enter your email-id";
      }
      else if($scope.user.email && !$scope.user.password){
        $scope.error = "*Please enter your password";
      }
      else if($scope.user.email && $scope.user.password){
        
      }
      console.log($scope.user);
    }
}]);
