
describe("directives: angular-tj-toast", function(){
  var $compile, $rootScope;

  beforeEach(function(){
    module('tjToast');
    inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });  
  
  //-----------------------------------------------------------------------------
  
  it('should replace the element with the appropriate content', function() {
    var element = $compile("<tj:toast></tj:toast>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('<!-- ngIf: tjToast || false -->');
  });
  
  //-----------------------------------------------------------------------------
});
