
describe("factory: tjToast", function(){
  var tjToast, $rootScope, $interval;
  
  beforeEach(function(){
    module('tjToast');
    inject(function(_tjToast_, _$rootScope_, _$interval_){
      tjToast = _tjToast_;
      $rootScope = _$rootScope_;
      $interval = _$interval_;
    });
    spyOn($rootScope, '$broadcast').and.callThrough();
    tjToast.reset();
  });
  
  it("should have a queue, which is an array", function(){
    expect(tjToast.queue()).toEqual([]);
  });
  
  it("should enqueue a toast with minimum config", function(){
    tjToast.enqueue({ level: 'success', text: 'A great success!' });
    expect(tjToast.queue().length).toBe(1);
  });
  
  it("should enqueue a toast with maximum config", function(){
    var toast = {
      level: 'success',
      text: 'Test completed successfully!',
      xclass: 'cssClassName cssClassName2',
      nodis: true,
      delay: 1000,
      tdelay: 100
    };
    tjToast.enqueue(toast);
    expect(tjToast.queue().length).toBe(1);
    expect(tjToast.queue().pop()).toEqual(toast);
  });
  
  it("should not enqueue a toast of type 'string'", function(){
    tjToast.enqueue('A sample toast message.');
    expect(tjToast.queue().length).toBe(0);
  });
  
  it("should not enqueue a toast missing 'level'", function(){
    tjToast.enqueue({ text: 'Missing level' });
    expect(tjToast.queue().length).toBe(0);
  });
  
  it("should not enqueue a toast missing 'text'", function(){
    tjToast.enqueue({ level: 'Missing text' });
    expect(tjToast.queue().length).toBe(0);
  });
  
  it("should clear the queue with reset()", function(){
    tjToast.enqueue({ level: 'success', text: 'A great success!' });
    expect(tjToast.queue().length).toBe(1);
    tjToast.reset();
    expect(tjToast.queue().length).toBe(0);
  });
  
  it("should broadcast and remove first toast with now()", function(){
    tjToast.enqueue({ level: 'success', text: 'A great success!' });
    tjToast.enqueue({ level: 'error', text: 'An error message!' });
    expect(tjToast.queue().length).toBe(2);
    tjToast.now();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('tj:toast',
      { level: 'success', text: 'A great success!' });
    expect(tjToast.queue().length).toBe(1);
  });
  
  it("should cycle through toasts with show()", function(){
    tjToast.enqueue({ level: 'success', text: 'A great success!' });
    tjToast.enqueue({ level: 'error', text: 'An error message!' });
    tjToast.enqueue({ level: 'warning', text: 'A warning message!' });
    expect(tjToast.queue().length).toBe(3);
    tjToast.now();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('tj:toast',
      { level: 'success', text: 'A great success!' });
    expect(tjToast.queue().length).toBe(2);
    tjToast.show();
    $interval.flush(10000);
    $interval.flush(10000);
    expect($rootScope.$broadcast).toHaveBeenCalledWith('tj:toast',
      { level: 'error', text: 'An error message!' });
    expect(tjToast.queue().length).toBe(1);
  });
  
  it("should cycle through toasts with dismiss()", function(){
    tjToast.enqueue({ level: 'success', text: 'A great success!' });
    tjToast.enqueue({ level: 'error', text: 'An error message!' });
    tjToast.enqueue({ level: 'warning', text: 'A warning message!' });
    expect(tjToast.queue().length).toBe(3);
    tjToast.now();
    expect($rootScope.$broadcast).toHaveBeenCalledWith('tj:toast',
      { level: 'success', text: 'A great success!' });
    expect(tjToast.queue().length).toBe(2);
    tjToast.dismiss();
    $interval.flush(1000);
    expect($rootScope.$broadcast).toHaveBeenCalledWith('tj:toast',
      { level: 'error', text: 'An error message!' });
    expect(tjToast.queue().length).toBe(1);
  });
    
});
