'use strict';

class DialogController {
  /* @ngInject */
  constructor(
    $rootScope,
    $scope,
    $window,
    $mdDialog,
    localStorageService,
    QuizFactory,
    APP_VERSION
  ) {
    $scope.repos = loadAll();
    $scope.quiz = QuizFactory;
    $scope.pageNumber = 'quiz';
    $scope.customUrl = QuizFactory.getConfig('QUIZCUSTOM');
    $scope.setLimit = QuizFactory.getConfig('SETLIMIT');
    $scope.debugMode = QuizFactory.getConfig('DEBUGMODE');
    $scope.theme = QuizFactory.getConfig('THEME') === 'light';
    $scope.timeLimit = QuizFactory.getConfig('TIMELIMIT');
    $scope.shuffleQuestions = QuizFactory.getConfig('SHUFFLEQUESTIONS');
    $scope.shuffleAnswers = QuizFactory.getConfig('SHUFFLEANSWERS');
    $scope.skipCorrect = QuizFactory.getConfig('SKIPCORRECT');
    $scope.hideAlert = QuizFactory.getConfig('HIDEALERT');
    $scope.appVersion = APP_VERSION;
    $scope.cheat = undefined;
    $scope.history = localStorageService.get('history') || [];

    $scope.close = function () {
      $mdDialog.hide();
    };

    $scope.removeHistory = function (index) {
      const history = localStorageService.get('history') || [];
      history.splice(index, 1);
      localStorageService.set('history', history);
      $scope.history = history;
    };

    $scope.dropCorrect = function (index) {
      localStorageService.set('answered', []);
    };

    $scope.save = function () {
      let reload = false;
      if ($scope.selectedItem && QuizFactory.getConfig('QUIZ') !== $scope.selectedItem.file) {
        QuizFactory.setConfig('QUIZ', $scope.selectedItem.file);
        reload = true;
      } else {
        QuizFactory.setConfig('QUIZ', null);
      }
      if (QuizFactory.getConfig('QUIZCUSTOM') !== $scope.customUrl) {
        QuizFactory.setConfig('QUIZCUSTOM', $scope.customUrl);
        reload = true;
      }
      if (QuizFactory.getConfig('THEME') !== $scope.theme) {
        QuizFactory.setConfig('THEME', $scope.theme ? 'light' : 'dark');
        reload = true;
      }

      if (reload) {
        $window.location.reload();
      }

      if (QuizFactory.getConfig('SETLIMIT') !== $scope.setLimit) {
        QuizFactory.setConfig('SETLIMIT', $scope.setLimit);
        $rootScope.$broadcast('START');
      }
      if (QuizFactory.getConfig('TIMELIMIT') !== $scope.timeLimit) {
        QuizFactory.setConfig('TIMELIMIT', $scope.timeLimit);
        $rootScope.$broadcast('START');
      }
      if (QuizFactory.getConfig('DEBUGMODE') !== $scope.debugMode) {
        QuizFactory.setConfig('DEBUGMODE', $scope.debugMode);
        $scope.quiz.init();
      }
      if (QuizFactory.getConfig('SHUFFLEQUESTIONS') !== $scope.shuffleQuestions) {
        QuizFactory.setConfig('SHUFFLEQUESTIONS', $scope.shuffleQuestions);
      }
      if (QuizFactory.getConfig('SHUFFLEANSWERS') !== $scope.shuffleAnswers) {
        QuizFactory.setConfig('SHUFFLEANSWERS', $scope.shuffleAnswers);
      }
      if (QuizFactory.getConfig('SKIPCORRECT') !== $scope.skipCorrect) {
        QuizFactory.setConfig('SKIPCORRECT', $scope.skipCorrect);
        $scope.quiz.init();
      }
      if (QuizFactory.getConfig('HIDEALERT') !== $scope.hideAlert) {
        QuizFactory.setConfig('HIDEALERT', $scope.hideAlert);
      }
      switch ($scope.cheat) {
        case 'DEBUGMODE':
          QuizFactory.setConfig('DEBUGMODE', !QuizFactory.getConfig('DEBUGMODE'));
          $scope.quiz.init();
          break;
        case 'SHOWANSWERS':
          QuizFactory.setConfig('SHOWANSWERS', !QuizFactory.getConfig('SHOWANSWERS'));
          break;
        default:
          var cheat = $scope.cheat;
          if (!angular.isUndefined(cheat) && cheat.indexOf('GOTO') === 0) {
            $rootScope.$broadcast('GOTO', { 'id': cheat.replace('GOTO', '') });
          }
          break;
      }
      $mdDialog.hide();
    };

    function loadAll() {
      const repos = [
        {
          'name': 'Custom',
          'file': 'example.json',
        },
      ];

      const file = QuizFactory.getConfig('QUIZ');

      return repos.map(function (repo) {
        repo.value = repo.name.toLowerCase();
        if (repo.file === file) {
          $scope.selectedItem = repo;
        }
        return repo;
      });
    }
  }
}

module.exports = DialogController;
