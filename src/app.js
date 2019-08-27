'use strict';

require('angular');
require('angular-animate');
require('angular-aria');
require('angular-sanitize');
require('angular-cookies');

require('angular-material');
require('angular-local-storage');
require('angular-highlightjs');
require('angular-hotkeys');

import './app.scss';

const APP_VERSION = '1.1.0';

angular
  .module(
    'quiz-client',
    [
      'ngMaterial',
      'ngSanitize',
      'ngCookies',
      'angular-intro',
      'hljs',
      'LocalStorageModule',
      'cfp.hotkeys',
    ]
  )
  .config(
    function (
      $mdIconProvider,
      $interpolateProvider,
      $locationProvider,
      $sceDelegateProvider,
      $httpProvider,
      $mdThemingProvider,
      localStorageServiceProvider,
      hotkeysProvider
    ) {
      $interpolateProvider.startSymbol('[[ ').endSymbol(' ]]');
      $locationProvider.html5Mode(true).hashPrefix('*');
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      $mdIconProvider.fontSet('md', 'material-icons');
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://docs.google.com/**',
      ]);
      hotkeysProvider.useNgRoute = false;
      localStorageServiceProvider
        .setPrefix('quiz-client')
        .setStorageType('localStorage')
        .setNotify(false, false);

      $mdThemingProvider.enableBrowserColor({
        theme: 'default',
        palette: 'primary',
        hue: '200'
      });
    }
  ).run(function (QuizFactory) {
    QuizFactory.init();
  })
  .value('APP_VERSION', APP_VERSION)
  .filter('orderObjectBy', function () {
    return function (items, field, reverse) {
      const filtered = [];
      angular.forEach(items, function (item) {
        filtered.push(item);
      });
      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if (reverse) filtered.reverse();

      return filtered;
    };
  })
  .filter('prettyDate', function () {
    return function (val) {
      const date = new Date(val);

      return date.toISOString().slice(0, 10) + ' ' + date.toISOString().slice(11, 19);
    };
  })
  .filter('prettyForm', function () {
    return function (val) {
      if (!val) {
        return val;
      }

      return val.replace(new RegExp('\n', 'g'), '<br>');
    };
  })
  .controller('AnswerToastController', require('./Controllers/AnswerToastController.js'))
  .controller('DialogController', require('./Controllers/DialogController.js'))
  .controller('IntroController', require('./Controllers/IntroController.js'))
  .controller('QuizController', require('./Controllers/QuizController.js'))
  .factory('QuizFactory', require('./Factory/QuizFactory.js'));
