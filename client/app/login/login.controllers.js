var app = angular.module('MovieReview');
app.controller('LoginController', ['$scope', 'Auth', '$state',function($scope, Auth, $state){
    $scope.user = {
      userName: '',
      password: ''
    };
    $scope.error = '';
    $scope.login = function(){
      console.log($scope.user);
      if(!$scope.user.userName){
        $scope.error = "*Please enter your email-id";
      }
      else if($scope.user.userName && !$scope.user.password){
        $scope.error = "*Please enter your password";
      }
      else if($scope.user.userName && $scope.user.password){
        Auth.login($scope.user).then(function(data){
          window.localStorage.mr_token = data.data.token;
          $state.go('movie');
          console.log(data);
        }, function(error){
          $scope.error = "*Invalid email-id or password"
          console.log(error);
        })
      }
    }
}]);
