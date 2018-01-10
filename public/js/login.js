var app = angular.module("loginapp", ["ngRoute"]);
app.controller('loginController', function($scope, $http) {
    $scope.register = function() {
        console.log($scope.username);
        console.log($scope.email);
        console.log($scope.password);
        console.log($scope.password_confirm);
        var req = {
            method: 'POST',
            url: '/api/login',
            
            data: { 
                username: $scope.username,
                email : $scope.email,
                password : $scope.password,
                password_confirm : $scope.password_confirm,
             }
           }
           
           $http(req).then(function(){console.log("success")}, function(){console.log("no")});
            
    };    
});