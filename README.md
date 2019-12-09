angular-tj-toast
=========

Lightweight `toast` aka `flash message` support for `Angular JS` apps:
* allows multiple toasts to be enqueued
* toasts can be displayed immediately or at a later time, such as after a view change
* must cycle through the toasts queue deliberately with `tjToast.now()`
* expects only one listening directive `<tj:toast></tj:toast>` within DOM

<a href="https://brinkt.github.io/angular-tj-toast/" target="_blank">View Live Demo</a>

Using in your app
-------------
To install to an app using `Bower`, use:

    $ bower install --save angular-tj-toast

Otherwise, clone this git repository.

Source `dist/angular-tj-toast.min.js` and `dist/angular-tj-toast.min.css` within your HTML.

Add `tjToast` as a dependency to your Angular app module and other desired places:
```javascript
var app = angular.module('yourApp', ['tjToast']);

app.controller('yourController', ['$scope','tjToast', function($scope, tjToast) {

  $scope.toastTest = function(){
    tjToast.enqueue({
      level: 'success',
      text: 'A great success!'
    });
    tjToast.now();
  };

}]);
```

Place a listening directive once within your HTML:
```html
<tj:toast></tj:toast>
```

Trigger the above example with a button click within your HTML:
```html
<button type="button" ng-click="toastTest()">Toast Test</button>
```

Please look to the <a href="https://brinkt.github.io/angular-tj-toast/" target="_blank">live demo</a> and its source
within the `demo` directory of this repository for additional examples and inspiration.

Development Dependencies
-------------
If you do not have `Node.js` installed, consider installing it via
<a href="https://github.com/creationix/nvm" target="_blank">nvm</a>:

    $ curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh
    $ source ~/.bashrc

Then install latest `Node.js` version, set it as the default, and check to make sure it installed correctly:

    $ nvm install 4.1.1
    $ nvm alias default 4.1.1
    $ node -v
    v4.1.1

Then, to install `Bower` globally, use:

    $ npm install -g bower

Developing tjToast
-------------
View `Node.js` dependencies in `package.json` and `Bower` dependencies in `bower.json`.

To install all `Node.js` dependencies, use:

    $ npm install

To install all `Bower` dependencies, use:

    $ bower install

To install `gulp` globally and avoid `gulp: command not found` error, use:

    $ npm install -g gulp

Once all dependencies are installed; run the development server, use:

    $ gulp serve

Now, visit `http://localhost:9000`

Using `browser-sync` via the configuration in `gulpfile.js` will automatically
reload the browser on various source changes and automatically inject CSS on its source change.

Running Tests
-------------
To execute jshint syntax test, use:

    $ gulp jshint

To execute all unit tests, use:

    $ gulp karma

To execute end-to-end (e2e) tests, use:

    $ gulp protractor

If `Error: No selenium server jar found at the specified location`, then run:

    $ gulp webdriver_update

To execute all 3 above tests (in sequence), use:

    $ gulp test

Both <a href="https://github.com/karma-runner/karma" target="_blank">Karma</a> and
<a href="https://github.com/angular/protractor" target="_blank">Protractor</a> tests use
<a href="http://jasmine.github.io/2.0/introduction.html" target="_blank">Jasmine</a> for their syntax.

Building
-------------
To create minified JS and CSS source files within the `dist` directory, use:

    $ gulp build

License
-------------
angular-tj-toast is released under the [MIT License](https://github.com/brinkt/angular-tj-toast/blob/master/LICENSE)


