'use strict';

class QuizFactory {
  /* @ngInject */
  constructor(
    $rootScope,
    $http,
    $mdToast,
    $location,
    APP_VERSION,
    localStorageService
  ) {
    return {
      init: async function () {
        const self = this;

        const config = localStorageService.get('config') || {};
        self.config = {
          APP_VERSION: config.APP_VERSION || APP_VERSION,
          QUIZ: config.QUIZ || 'example.json',
          QUIZTYPE: config.QUIZTYPE || 'choice',
          QUIZCUSTOMURL: config.QUIZCUSTOMURL || null,
          QUIZCUSTOMJSON: config.QUIZCUSTOMJSON || null,
          SETLIMIT: config.SETLIMIT || 75,
          TIMELIMIT: config.TIMELIMIT || 90,
          SHOWANSWERS: config.SHOWANSWERS || false,
          SHUFFLEQUESTIONS: angular.isUndefined(config.SHUFFLEQUESTIONS)
            ? true : config.SHUFFLEQUESTIONS,
          SHUFFLEANSWERS: angular.isUndefined(config.SHUFFLEANSWERS)
            ? true : config.SHUFFLEANSWERS,
          SKIPCORRECT: angular.isUndefined(config.SKIPCORRECT)
            ? false : config.SKIPCORRECT,
          HIDEALERT: angular.isUndefined(config.HIDEALERT)
            ? false : config.HIDEALERT,
          DEBUGMODE: config.DEBUGMODE || false,
          THEME: config.THEME || 'light',
        };

        if (self.config.APP_VERSION !== APP_VERSION) {
          alert('New version, see changelog!');
          window.open('CHANGELOG.md', '_blank');
          self.setConfig('APP_VERSION', APP_VERSION);
        }

        let quizUrl = null;
        if (self.config.QUIZTYPE === 'choice') {
          quizUrl = 'assets/questions/' + self.config.QUIZ;
        } else if (self.config.QUIZTYPE === 'url') {
          quizUrl = self.config.QUIZCUSTOMURL;
        }

        if ($location.search().hasOwnProperty('quizCustomUrl')) {
          // if query parameter quizCustomUrl has, load him priority
          quizUrl = $location.search()['quizCustomUrl'];
        }

        if (quizUrl) {
          return new Promise((resolve, reject) => {
            $http({
              method: 'GET',
              url: quizUrl
            }).then(function success(response) {
              self.loadData(response.data);
              resolve();
            }, function error(response) {
              console.log('No response, or ' + response);
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Questions db loading failed!')
                  .position('bottom right')
                  .hideDelay(0)
              );
              reject();
            });
          });
        } else if (self.config.QUIZTYPE === 'text') {
          return new Promise((resolve) => {
            self.loadData(angular.fromJson(self.config.QUIZCUSTOMJSON));
            resolve();
          });
        }

        throw new Error('Test data loading - failed!');
      },
      loadData: function (data) {
        const self = this;

        self.questions = [];

        const answered = localStorageService.get('answered') || [];
        const answeredIds = [];
        angular.forEach(answered, function (value, key) {
          answeredIds.push(value.questionId);
        });

        angular.forEach(data.questions, function (value, key) {
          // Set id if null;
          value.id = value.id || (key + 1);
          if (
            !self.getConfig('SKIPCORRECT')
            || answeredIds.indexOf(value.id) == -1
          ) {
            self.questions.push(value);
          }
        });

        self.header = data.header;
      },
      getHeader: function (key) {
        if (key) {
          return (
            this.header
            && !angular.isUndefined(this.header[key])
          ) ? this.header[key] : null;
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
        localStorageService.set('config', this.config);
      },
      getConfig: function (key) {
        if (key) {
          return (
            this.config
            && !angular.isUndefined(this.config[key])
          ) ? this.config[key] : null;
        }

        return this.config;
      },
    };
  }
}

module.exports = QuizFactory;
