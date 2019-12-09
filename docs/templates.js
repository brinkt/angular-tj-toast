(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('custom.html',
    '<p class="mar-t20">This toast will be displayed after the view redirects to the previous page.</p><div class="gt mar-b10"><div class="gc"><label for="level" class="pad-r10">Level</label><select name="level" ng-model="level"><option value="success">success</option><option value="error">error</option><option value="warning">warning</option></select></div><div class="gc" style="width: 60%;"><input type="text" name="text" placeholder="Toast text..." ng-model="text"></div><div class="gcrb"><div class="pad-l10"><button id="btnCustomDemo" type="button" class="btn" ng-click="customDemo()">Submit</button></div></div></div><p class="mar-t20">Automatically display toasts on specific route (requires ngRoute):</p><pre><code>\n' +
    '  app.controller(\'ToastController\',\n' +
    '    [\'$scope\',\'$location\',\'tjToast\',\n' +
    '    function($scope, $location, tjToast) {\n' +
    '    \n' +
    '    // listen for path changes; if path=/, run toasts\n' +
    '    $scope.$on(\'$routeChangeSuccess\', function(){\n' +
    '      var path = $location.path();\n' +
    '      if( path == \'/\' ){\n' +
    '        tjToast.now();\n' +
    '      }\n' +
    '    });\n' +
    '    \n' +
    '  }]);\n' +
    '  \n' +
    '</code></pre><div class="mar-t20"><a href="#/" class="btn">Go Back</a></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('demo.html',
    '<div id="toast"><tj:toast></tj:toast></div><button id="btnDemo" type="button" class="btn" ng-click="toastDemo()">Run Demo</button> <a href="#/custom" class="btn">Custom Toast</a><p>Add a success message with the default settings.</p><div class="gt mar-b10"><div class="gc"><label for="level" class="pad-r10">Level</label><select name="level" ng-model="level"><option value="success">success</option><option value="error">error</option><option value="warning">warning</option></select></div><div class="gc" style="width: 75%;"><input type="text" name="text" placeholder="Toast text..." ng-model="text"></div></div><div class="demo"><button id="btnDemo1" type="button" class="btn pre-demo" ng-click="demo1()">demo</button><pre><code>\n' +
    '  tjToast.enqueue({\n' +
    '    level: \'{{level}}\',\n' +
    '    text: \'{{text}}\'\n' +
    '  });\n' +
    '  </code></pre></div><p>Add an error message that cannot be dismissed for 8 seconds using a custom "3D Cube" animation with an extra transition delay before the next toast.</p><div class="demo"><button id="btnDemo2" type="button" class="btn pre-demo" ng-click="demo2()">demo</button><pre><code>\n' +
    '  tjToast.enqueue({\n' +
    '    level: \'error\',\n' +
    '    text: \'Error: You cannot dismiss this!\',\n' +
    '    xclass: \'tjToast-3dc\',\n' +
    '    nodis: true,\n' +
    '    delay: 8000,\n' +
    '    tdelay: 2000\n' +
    '  });\n' +
    '  </code></pre></div><p>Add a warning message that uses a custom "3D Rotate" animation and lasts 3 seconds instead of the default 5 seconds.</p><div class="demo"><button id="btnDemo3" type="button" class="btn pre-demo" ng-click="demo3()">demo</button><pre><code>\n' +
    '  tjToast.enqueue({\n' +
    '    level: \'warning\',\n' +
    '    text: \'This is your last warning!\',\n' +
    '    delay: 3000,\n' +
    '    xclass: \'tjToast-3dr\'\n' +
    '  });\n' +
    '  </code></pre></div><p>Must deliberately start cycling through and displaying toasts.</p><pre><code>\n' +
    '  tjToast.now();\n' +
    '  \n' +
    '</code></pre>');
}]);
})();
