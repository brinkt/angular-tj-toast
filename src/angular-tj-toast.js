(function() {
  'use strict';
  var app = angular.module('tjToast', []);

  var toastTemplate =
    '<div id="tjToast" ng-if="tjToast || false" class="tjToast tjToast-{{toast.level}} {{toast.xclass}}">'+
    '<span>{{toast.text}}</span><button type="button" ng-hide="toast.nodis"' +
    ' class="tjToast-dismiss" dismiss-toast>X</button></div>';

  app.directive('dismissToast', ['tjToast', function(tjToast) {
    return { link: function(s,e) { e.on('click', function(){ tjToast.dismiss(); }); }};
  }]);

  app.directive('tjToast', ['tjToast', function(tjToast) {
    return { restrict: 'EA', template: toastTemplate,
      link: function(scope, element, attrs) {
        scope.$on('tj:toast', function(_, toast) {
          scope.toast = toast;
          tjToast.show(toast.delay, toast.tdelay);
        });
      }
    };
  }]);
  
  app.factory('tjToast', ['$rootScope', '$interval', function($rootScope, $interval) {
    var toasts = [], timeOut;
    
    var validToast = function(t) {
      if( typeof t == 'object' && typeof t.level == 'string' && typeof t.text == 'string' ) return true;
      return false;
    };

    var broadcast = function() {
      if( Object.keys(toasts).length > 0 ){
        $rootScope.$broadcast('tj:toast', toasts.shift());
      }
    };

    var dequeue = function(tdelay) {
      if( typeof tdelay != 'number' ){ tdelay = 500; } // default
      $interval(function(){ $rootScope.tjToast = false; }, 0, 1);
      $interval(function(){ broadcast(); }, tdelay, 1);
    };

    return {
      enqueue: function(t){
        if( validToast(t) === true ){ toasts.push(t); }
      },
      
      show: function(delay, tdelay){
        if( typeof delay != 'number' ){ delay = 5000; } // default
        $interval(function() { $rootScope.tjToast = true; }, 0, 1);
        timeOut = $interval(function(){ dequeue(tdelay); }, delay, 1);
      },

      dismiss: function(){
        if( typeof timeOut == 'object' ){ $interval.cancel(timeOut); }
        dequeue();
      },

      queue: function(){ return toasts; },
      now: function() { broadcast(); },

      reset: function(){
        $interval.cancel(timeOut);
        $rootScope.tjToast = false;
        toasts = [];
      }
    };
  }]);
}());
