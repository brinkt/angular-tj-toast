(function() {
  'use strict';
  var app = angular.module('angular-tj-toast-demo',
    ['ngRoute', 'ngAnimate', 'templates', 'tjToast']);
  
  //-----------------------------------------------------------------------------
  
  app.config(
    ['$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider){
    
    $routeProvider
    .when('/', { controller: 'ToastController',
      templateUrl: 'demo.html'
    })
    
    .when('/custom', { controller: 'ToastController',
      templateUrl: 'custom.html'
    })
    
    .otherwise({
      redirectTo: '/'
    });
    
  }]);
  
  //-----------------------------------------------------------------------------
  
  app.controller('ToastController', [
    '$scope','$location','tjToast',
    function($scope, $location, tjToast) {
    
    //-----------------------------------------------------------------------------
    // 3 demo toast enqueues
    
    var toast1 = function(){
      tjToast.enqueue({
        level: $scope.level,
        text: $scope.text
      });
    };
    
    var toast2 = function(){
      tjToast.enqueue({
        level: 'error',
        text: 'Error: You cannot dismiss this!',
        xclass: 'tjToast-3dc',
        nodis: true,
        delay: 8000,
        tdelay: 2000
      });
    };
    
    var toast3 = function(){
      tjToast.enqueue({
        level: 'warning',
        text: 'This is your last warning!',
        delay: 3000,
        xclass: 'tjToast-3dr'
      });
    };
    
    //-----------------------------------------------------------------------------
    // 4 demo buttons
    
    $scope.toastDemo = function(){
      tjToast.reset();
      toast1();
      toast2();
      toast3();
      tjToast.now();
    };
    
    $scope.demo1 = function(){
      tjToast.reset();
      toast1();
      tjToast.now();
    };
    
    $scope.demo2 = function(){
      tjToast.reset();
      toast2();
      tjToast.now();
    };
    
    $scope.demo3 = function(){
      tjToast.reset();
      toast3();
      tjToast.now();
    };
    
    //-----------------------------------------------------------------------------
    // custom demo button
    
    $scope.customDemo = function(){
      tjToast.reset();
      toast1();
      $location.path('/');
    };
    
    //-----------------------------------------------------------------------------
    // route $scope defaults
    
    $scope.$on('$routeChangeSuccess', function(){
      var path = $location.path();
      if( path == '/' ){
        // demo.html
        $scope.level = 'success';
        $scope.text = 'What a great success!';
        tjToast.now();
      } else if( path == '/custom' ){
        // custom.html
        $scope.level = 'warning';
        $scope.text = 'We are issuing a custom warning!';
      }
    });
    
  }]);
  
  //-----------------------------------------------------------------------------
}());
