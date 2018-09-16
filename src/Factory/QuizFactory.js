'use strict';

class QuizFactory {
  /*@ngInject*/
  constructor($rootScope, $http, $cookies, $mdToast, APP_VERSION, localStorageService) {
    return {
      init: function () {
        var self = this;

        var config = $cookies.getObject('config') || {};
        self.config = {
          APP_VERSION: config.APP_VERSION || APP_VERSION,
          QUIZ: config.QUIZ || "example.json",
          QUIZCUSTOM: config.QUIZCUSTOM || null,
          SETLIMIT: config.SETLIMIT || 75,
          TIMELIMIT: config.TIMELIMIT || 90,
          SHOWANSWERS: config.SHOWANSWERS || false,
          SHUFFLEQUESTIONS: angular.isUndefined(config.SHUFFLEQUESTIONS) ? true : config.SHUFFLEQUESTIONS,
          SHUFFLEANSWERS: angular.isUndefined(config.SHUFFLEANSWERS) ? true : config.SHUFFLEANSWERS,
          SKIPCORRECT: angular.isUndefined(config.SKIPCORRECT) ? false : config.SKIPCORRECT,
          DEBUGMODE: config.DEBUGMODE || false
        };

        if (self.config.QUIZ === null && self.config.QUIZCUSTOM === null) {
          self.setConfig("QUIZ", "example.json");
        }

        if (self.config.APP_VERSION !== APP_VERSION) {
          alert("New version, see changelog!");
          window.open('CHANGELOG.md', '_blank');
          self.setConfig("APP_VERSION", APP_VERSION);
        }

        let url;
        if (self.config.QUIZCUSTOM) {
          url = self.config.QUIZCUSTOM;
        } else {
          url = "assets/questions/" + self.config.QUIZ;
        }

        $http({
          method: 'GET',
          url: url
        }).then(function success(response) {
          var json = angular.fromJson(response);
          self.questions = [];

          var answered = localStorageService.get("answered") || [];
          var answeredIds = [];
          angular.forEach(answered, function (value, key) {
            answeredIds.push(value.questionId);
          });

          angular.forEach(json.data.questions, function (value, key) {
            // Set id if null;
            value.id = value.id || (key + 1);
            if ((self.config.DEBUGMODE && value.hint == "") || (!self.config.DEBUGMODE && value.hint != "")) {
              if (!self.getConfig("SKIPCORRECT") || answeredIds.indexOf(value.id) == -1) {
                self.questions.push(value);
              }
            }
          });
          self.header = json.data.header;
          $rootScope.$broadcast("START");
        }, function error(response) {
          console.log("No response, or " + response);
          $mdToast.show(
            $mdToast.simple()
              .textContent('Questions db loading failed!')
              .position('bottom right')
              .hideDelay(0)
          );
        });
      },
      getHeader: function (key) {
        if (key) {
          return (this.header && !angular.isUndefined(this.header[key])) ? this.header[key] : null;
        }

        return this.header;
      },
      getQuestions: function (index) {
        if (index) {
          return this.questions[index];
        }

        return this.questions;
      },
      setConfig: function (key, value) {
        this.config[key] = value;
        $cookies.putObject('config', this.config);
      },
      getConfig: function (key) {
        if (key) {
          return (this.config && !angular.isUndefined(this.config[key])) ? this.config[key] : null;
        }

        return this.config;
      }
    };
  }
}

module.exports = QuizFactory;
