(function () {
    "use strict";

    angular
        .module('quiz-client', ['ngMaterial', 'ngSanitize', 'ngCookies', 'angular-intro', 'hljs', 'LocalStorageModule'])
        .config(function ($mdIconProvider, $interpolateProvider, $httpProvider, localStorageServiceProvider) {
            $interpolateProvider.startSymbol('[[ ').endSymbol(' ]]');
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            $mdIconProvider.fontSet('md', 'material-icons');
            localStorageServiceProvider
                .setPrefix('quiz-client')
                .setStorageType('localStorage')
                .setNotify(false, false)
        })
        .value("APP_VERSION", "1.0.2")
        .run(function (QuizFactory) {

            QuizFactory.init();
        })
        .filter('orderObjectBy', function () {
            return function (items, field, reverse) {
                var filtered = [];
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
        .filter('prettyDate', function() {
            return function(val) {
                var date = new Date(val);

                return date.toISOString().slice(0, 10) + " " + date.toISOString().slice(11, 19);
            };
        })
        .filter('prettyForm', function() {
            return function(val) {
                if (!val) {
                    return val;
                }

                return val.replace(new RegExp("\n", 'g'), "<br>");
            };
        });
})();
