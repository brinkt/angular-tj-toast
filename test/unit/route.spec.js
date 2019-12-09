
describe("routes: angular-tj-toast-demo", function(){
  var $location, $route, $rootScope, $templateCache;
  
  //-----------------------------------------------------------------------------
  
  beforeEach(function(){
    module('angular-tj-toast-demo');
    inject(function(_$location_, _$route_, _$rootScope_, _$templateCache_){
      $location = _$location_;
      $route = _$route_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;
    });
    // set up mock template data
    $templateCache.put('demo.html', 'demo HTML');
    $templateCache.put('custom.html', 'custom HTML');
  });  
  
  //-----------------------------------------------------------------------------
  
  it("should load demo.html on successful load of /", function(){
    expect($location.path()).toBe('');
    $location.path('/');
    $rootScope.$digest();
    expect($location.path()).toBe('/');
    expect($route.current.controller).toBe('ToastController');
    expect($route.current.loadedTemplateUrl).toBe('demo.html');
  });
  
  //-----------------------------------------------------------------------------
  
  it("should load custom.html on successful load of /custom", function(){
    expect($location.path()).toBe('');
    $location.path('/custom');
    $rootScope.$digest();
    expect($location.path()).toBe('/custom');
    expect($route.current.controller).toBe('ToastController');
    expect($route.current.loadedTemplateUrl).toBe('custom.html');
  });
  
  //-----------------------------------------------------------------------------
  
  it('should redirect to the index path on non-existent route', function(){
    expect($location.path()).toBe('');
    $location.path('/a/non-existent/route');
    $rootScope.$digest();
    expect($location.path()).toBe( '/' );
    expect($route.current.controller).toBe('ToastController');
    expect($route.current.loadedTemplateUrl).toBe('demo.html');
  });
  
  //-----------------------------------------------------------------------------
});
