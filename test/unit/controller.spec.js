
describe("controller: angular-tj-toast-demo", function(){
  var $location, $controller, $rootScope, $templateCache;
  
  //-----------------------------------------------------------------------------
  
  beforeEach(function(){
    module('angular-tj-toast-demo');
    inject(function(_$location_, _$controller_, _$rootScope_, _$templateCache_){
      $location = _$location_;
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;
    });
    // set up mock template data
    $templateCache.put('demo.html', 'demo HTML');
    $templateCache.put('custom.html', 'custom HTML');
  });  
  
  //-----------------------------------------------------------------------------
  
  it("should have set all the demo button functions", function(){
    var $scope = $rootScope.$new();
    $controller("ToastController", {$scope:$scope});
    expect($scope).toBeDefined();
    expect($scope.toastDemo).toBeDefined();
    expect($scope.demo1).toBeDefined();
    expect($scope.demo2).toBeDefined();
    expect($scope.demo3).toBeDefined();
    expect($scope.customDemo).toBeDefined();
  });
  
  //-----------------------------------------------------------------------------
  
  it("should have set `level` and `text` for path=/", function(){
    $location.path('/');
    $rootScope.$digest();
    
    var $scope = $rootScope.$new();
    $controller("ToastController", {$scope:$scope});
    
    $rootScope.$broadcast('$routeChangeSuccess');
    
    expect($scope).toBeDefined();
    expect($scope.level).toBe('success');
    expect($scope.text).toBe('What a great success!');
  });
  
  //-----------------------------------------------------------------------------
  
  it("should have set `level` and `text` for path=/custom", function(){
    $location.path('/custom');
    $rootScope.$digest();
    
    var $scope = $rootScope.$new();
    $controller("ToastController", {$scope:$scope});
    
    $rootScope.$broadcast('$routeChangeSuccess');
    
    expect($scope).toBeDefined();
    expect($scope.level).toBe('warning');
    expect($scope.text).toBe('We are issuing a custom warning!');
  });
  
  //-----------------------------------------------------------------------------
});
