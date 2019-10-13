'use strict';

class QuizController {
  /* @ngInject */
  constructor(
    $rootScope,
    $scope,
    $interval,
    $sce,
    $mdDialog,
    $mdToast,
    localStorageService,
    QuizFactory,
    hotkeys
  ) {
    const self = this;
    let interval;
    let timeLeft;
    const shuffleArray = function (array) {
      let m = array.length; let t; let i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    };

    this.quiz = QuizFactory;
    this.set = {
      current: {
        variants: {},
      },
      questions: {},
    };
    this.showAnswers = false;
    this.answer = '';
    this.answers = [];
    this.isCorrect = false;
    this.timerValue = 100;
    this.submitted = false;
    this.incorrectCount = 0;
    this.correctCount = 0;
    this.end = false;
    this.disabled = {};

    hotkeys
      .bindTo($scope)
      .add({
        combo: 'enter',
        callback: function ($event) {
          self.submit();
          $event.preventDefault();
        },
      })
      .add({
        combo: 'left',
        callback: function ($event) {
          self.before($event);
          $event.preventDefault();
        },
      })
      .add({
        combo: 'right',
        callback: function ($event) {
          self.next($event);
          $event.preventDefault();
        },
      });

    for (let keyNumber = 0; keyNumber < 9; keyNumber++) {
      hotkeys
        .add({
          combo: '' + (keyNumber + 1),
          callback: function ($event) {
            let variant = self.set.current.variants[keyNumber] || false;
            if (variant) {
              self.toggle(variant, self.answers);
            }
            $event.preventDefault();
          },
        });
    }

    this.exists = function (item, list) {
      return list.indexOf(item) > -1 ||
        (!angular.isUndefined(this.disabled[this.set.current.id]) &&
          Array.isArray(this.disabled[this.set.current.id]) &&
          this.disabled[this.set.current.id].indexOf(item) > -1
        );
    };

    this.toggle = function (item, list) {
      const indx = list.indexOf(item);
      if (indx === -1) {
        list.push(item);
      } else {
        list.splice(indx, 1);
      }
    };

    this.start = function () {
      // TODO: run intro 2 (pause interval)
      const self = this;

      timeLeft = self.quiz.getConfig('TIMELIMIT') * 60;
      if (interval) {
        $interval.cancel(interval);
      }
      interval = $interval(function () {
        self.timerValue = 100 / (self.quiz.getConfig('TIMELIMIT') * 60) * timeLeft--;
      }, 1000);

      let set;
      if (QuizFactory.getConfig('SHUFFLEQUESTIONS')) {
        set = shuffleArray(this.quiz.getQuestions());
      } else {
        set = this.quiz.getQuestions();
      }
      let size = self.quiz.getConfig('SETLIMIT');
      if (size > self.quiz.getQuestions().length) {
        size = self.quiz.getQuestions().length;
      }
      this.set.questions = set.slice(0, size);
      this.set.pos = 0;
      this.incorrectCount = 0;
      this.correctCount = 0;
      this.end = false;
      this.disabled = {};
      this.next();
    };

    this.error = function (id) {
      $mdDialog.show({
        template: ' <md-dialog aria-label="List dialog">' +
          '  <md-dialog-content>' +
          '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdGRg6zaPT9mi_Nnxrwnr8Zrd2h4olszWL9WmIquV-wuCawag/viewform?usp=pp_url&entry.1382005952=Info&entry.414927858=' + self.quiz.getConfig('QUIZCUSTOM') + ':' + id + '"></iframe>' +
          '  </md-dialog-content>' +
          '  <md-dialog-actions>' +
          '    <md-button ng-click="closeDialog()" class="md-primary">' +
          '      Close' +
          '    </md-button>' +
          '  </md-dialog-actions>' +
          '</md-dialog>',
        locals: { id: id },
        controller: function DialogController($scope, $mdDialog) {
          $scope.closeDialog = function () {
            $mdDialog.hide();
          };
        },
      });
    };

    this.next = function () {
      $mdToast.hide();
      this.submitted = false;
      this.isCorrect = false;
      this.answer = '';
      this.showAnswers = QuizFactory.getConfig('SHOWANSWERS');
      if (this.set.pos < this.set.questions.length) {
        this.set.current = this.set.questions[this.set.pos];
        if (this.showAnswers) {
          this.answer = this.set.current.answers.length > 0 ? this.set.current.answers[0] : '';
        }
        if (QuizFactory.getConfig('SHUFFLEANSWERS')) {
          this.set.current.variants = shuffleArray(this.set.current.variants);
        }
        this.set.pos++;
        this.answers = [];
      } else if (!this.end && confirm('End test?')) {
        const history = localStorageService.get('history') || [];
        history.push({
          'correct': this.correctCount,
          'incorrect': this.incorrectCount,
          'date': Date.now(),
        });
        this.end = true;
        localStorageService.set('history', history);
        alert('Great! Correct answer '
          + this.correctCount
          + ', incorrect answer '
          + this.incorrectCount
          + ', correct percent '
          + Math.round(this.correctCount / this.set.questions.length * 100)
          + '%'
        );
      }
    };

    this.before = function () {
      if (this.set.pos > 1) {
        --this.set.pos;
        this.set.current = this.set.questions[this.set.pos - 1];
        if (!angular.isUndefined(this.disabled[this.set.current.id])) {
          if (Array.isArray(this.disabled[this.set.current.id])) {
            this.answers = this.disabled[this.set.current.id];
          } else {
            this.answer = this.disabled[this.set.current.id];
          }
          this.submitted = true;
        }
      }
    };

    this.submit = function () {
      const self = this;
      if (this.submitted) {
        this.next();
      } else {
        this.showAnswers = true;
        this.submitted = true;
        this.disabled[this.set.current.id] = this.set.current.variants.length > 0 ? this.answers : this.answer;
        if (this.set.current.variants.length > 0) {
          let correctCount = 0;
          angular.forEach(this.set.current.variants, function (value, key) {
            if (value.isCorrect) {
              correctCount++;
            }
          });
          this.isCorrect = this.answers.length && (this.answers.length === correctCount);
          if (this.isCorrect) {
            angular.forEach(this.answers, function (value, key) {
              if (!value.isCorrect) {
                self.isCorrect = false;
              }
            });
          }
        } else {
          this.isCorrect = this.set.current.answers.indexOf(this.answer) > -1;
        }
        this.answer = this.set.current.answers.length > 0 ? this.set.current.answers[0] : '';

        if (this.isCorrect) {
          this.correctCount++;
          if (self.quiz.getConfig('SKIPCORRECT')) {
            const answered = localStorageService.get('answered') || [];
            answered.push({
              'quiz': self.quiz.getConfig('QUIZ'),
              'questionId': this.set.current.id,
            });
            localStorageService.set('answered', answered);
          }
        } else {
          this.incorrectCount++;
        }

        $mdToast.show({
          hideDelay: 0,
          position: 'bottom right',
          controller: 'AnswerToastController',
          template: require('../templates/answer-toast.tmpl.html'),
          bindToController: true,
          locals: {
            isCorrect: this.isCorrect,
            hint: this.set.current.hint,
            hintUrl: this.set.current.hintUrl,
          },
        });
      }
    };

    this.showSettings = function (ev) {
      $mdDialog.show({
        controller: 'DialogController',
        template: require('../templates/settings.tmpl.html'),
        targetEvent: ev,
        clickOutsideToClose: false,
      });
    };

    this.showHistory = function (ev) {
      $mdDialog.show({
        controller: 'DialogController',
        template: require('../templates/history.tmpl.html'),
        targetEvent: ev,
        clickOutsideToClose: false,
      });
    };

    this.showInfo = function (ev) {
      $mdDialog.show({
        controller: 'DialogController',
        template: require('../templates/info.tmpl.html'),
        targetEvent: ev,
        clickOutsideToClose: false,
        locals: {
          tags: [],
        },
      });
    };

    this.showHint = function (ev) {
      $rootScope.$broadcast(
        'SHOWHINT',
        {
          'hint': self.set.current.hint,
          'hintUrl': self.set.current.hintUrl,
        }
      );
    };

    function getHintMessage(message) {
      return `<strong>${message}</strong>`
    }

    function getHintIFrame(url) {
      return `<iframe frameborder="0" height="800" width="600" allowfullscreen sandbox"allow-forms allow-scripts" src="${url}"></iframe>`;
    }

    $rootScope.$on('SHOWHINT', function (event, args) {
      let hintMessage = args.hint || "No hint given!";
      let hintWebsite = args.hintUrl || "https://www.google.com/webhp?igu=1";
      let htmlContent = `${getHintMessage(hintMessage)}<hr/><br/>${getHintIFrame(hintWebsite)}`;

      $mdDialog
        .show($mdDialog
          .alert()
          .title('More info goes here.')
          .htmlContent($sce.trustAsHtml(htmlContent))
          .ariaLabel('More info')
          .ok('Got it')
          .targetEvent(event)
        ).then(function () {
          $rootScope.$broadcast('HINTCLOSE');
        });
    });

    $rootScope.$on('START', function (event, args) {
      self.start();
    });

    $rootScope.$on('GOTO', function (event, args) {
      let current;
      angular.forEach(self.quiz.getQuestions(), function (value, key) {
        if (value.id == args.id) {
          current = value;
        }
      });

      self.set.current = current;
    });
  }
}

module.exports = QuizController;
