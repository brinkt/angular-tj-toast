module.exports = function(config){
  config.set({
    browsers: ['Chrome', 'Firefox'],
    frameworks: ['jasmine'],
    files: [
      "bower_components/angular/angular.js",
      "bower_components/angular-route/angular-route.js",
      "bower_components/angular-animate/angular-animate.js",
      "bower_components/angular-mocks/angular-mocks.js",
      
      "src/angular-tj-toast.js",
      
      "docs/app.js",
      "docs/templates.js",
      
      "test/unit/*.spec.js"
    ],
  });
};
