exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar',
  
  capabilities: {
    'browserName': 'chrome'
  },
  
  framework: 'jasmine2',
  
  specs:['e2e/*.js'],
  
  allScriptsTimeout: 500000,
  
  jasmineNodeOpts: {
    showColors: true
  }

};
