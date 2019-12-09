describe('e2e: angular-tj-toast-demo', function() {
	
	it('should display a custom toast message', function(){
	  var level = element(by.model('level'));
	  var message = element(by.model('text'));
	  var submit = element(by.id('btnCustomDemo'));
	  
	  browser.get('http://localhost:9001/#/custom');
	  
	  level.sendKeys('success');
	  
	  message.clear();
	  message.sendKeys('A protractor success test!');
	  
	  browser.sleep(1000);
	  submit.click();
	  browser.sleep(1000);
	  
	  expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/');
	  expect(element(by.id('tjToast')).getText()).toEqual('A protractor success test!X');
	});

	it('should get demo page, click demo button, watch toasts', function(){
	  var toast = element(by.id('tjToast'));
	  var dismiss = element(by.css('.tjToast-dismiss'));
	  
	  browser.get('http://localhost:9001');
		element(by.id('btnDemo')).click();
		browser.sleep(1000);
		
		expect(toast.getText()).toEqual('What a great success!X');
		dismiss.click();
  	browser.sleep(1000);
  	
  	expect(toast.getText()).toEqual('Error: You cannot dismiss this!');
  	browser.sleep(10000);
  	
  	expect(toast.getText()).toEqual('This is your last warning!X');
  	browser.sleep(1000);
	});

});
