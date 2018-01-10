var app = angular.module("stockapp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl :  "../views/admin_table.html"
    })
    .when('/admin_add', {
        templateUrl :  "../views/admin_add.html"
    })
    .when('/admin_table', {
        templateUrl :  "../views/admin_table.html"
    })
    .when('/admin_update', {
        templateUrl :  "../views/admin_update.html",
        controller: 'tableController'
       
    })
});
app.controller('indexController', function($scope, $http) {

   
});


//insert values
app.controller('formController', function($scope, $http) {
    $scope.createform = function() {
        console.log($scope.stripcode);
     
        var req = {
            method: 'POST',
            url: 'api/todos',
            
            data: { 
                test: $scope.stripcode,
                stripname : $scope.stripname,
                currentrate : $scope.currentrate,
                stockloss : $scope.stockloss,
                target : $scope.target
             }
           }
           
           $http(req).then(function(){$("#createMsg").text("Successfully Saved");}, function(){$("#createMsg").text("Error");});
            
    };    
});

app.service('sharedvalues', function () {
    var property = 'First';

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(tbldata) {
            property = tbldata;
        }
    };
});
//get data from db
app.controller('tableController', function($scope, $http, sharedvalues) {
  //  $scope.getDatas = function() {
    $http({
        method: 'GET',
        url: 'api/todos'
      }).then(function successCallback(response) {
          $scope.data = response.data;
          console.log('-------', $scope.data);
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
       
  //  }; 
    
    $scope.deleteData = function(id) {

        $http({
            method: 'Delete',
            url: 'api/todos/'+id
          }).then(function successCallback(response) {
              $scope.data = response.data;
              console.log('-------', $scope.data.data);
              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
    }
    $scope.editData = function(tbldata){ 
        location.href='#!admin_update';
        console.log("my",tbldata);
        sharedvalues.setProperty(tbldata);
    }
});


app.controller('tableControllers', function($scope, $http,sharedvalues) {
    tbldata = sharedvalues.getProperty();
    $scope.stripcodes = tbldata.stripcode; 
    $scope.stripname=tbldata.stripname
    $scope.currentrate=tbldata.currentrate
    $scope.stockloss=tbldata.stockloss
    $scope.target=tbldata.target
   console.log("end",tbldata.stripcode);
   


   $scope.update = function() {
    // $scope.editData();

     console.log("up",tbldata._id);
    id= tbldata._id;
     
     var req = {
         method: 'PUT',
         url: 'api/todos/'+ id,
         
         data: { 
             id :tbldata._id,
             test : $scope.stripcodes,
             stripname : $scope.stripname,
             currentrate : $scope.currentrate,
             stockloss : $scope.stockloss,
             target : $scope.target
          }
        }
        
       $http(req).then(function(){console.log("success")}, function(){console.log("no")});
    }
});




