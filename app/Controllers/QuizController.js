(function () {
    "use strict";

    function QuizController($rootScope, $scope, $http, $interval, $sce, $mdDialog, $mdToast, localStorageService, QuizFactory) {
        var self = this,
            interval,
            timeLeft,
            shuffleArray = function (array) {
                var m = array.length, t, i;
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
                variants: {}
            },
            questions: {}
        };
        this.showAnswers = false;
        this.answer = "";
        this.answers = [];
        this.isCorrect = false;
        this.timerValue = 100;
        this.submitted = false;
        this.incorrectCount = 0;
        this.correctCount = 0;
        this.end = false;
        this.disabled = {};

        this.exists = function (item, list) {
            return list.indexOf(item) > -1 ||
                (!angular.isUndefined(this.disabled[this.set.current.id]) &&
                    Array.isArray(this.disabled[this.set.current.id]) &&
                    this.disabled[this.set.current.id].indexOf(item) > -1
                );
        };

        this.toggle = function (item, list) {
            var indx = list.indexOf(item);
            if (indx === -1) {
                list.push(item);
            } else {
                list.splice(indx, 1);
            }
        };

        this.init = function () {
            var self = this;

            $http({
                method: 'GET',
                url: "assets/questions/" + self.quiz.getConfig("QUIZ")
            }).then(function success(response) {
                var json = angular.fromJson(response);
                self.questions = json.data.questions;
                self.start();
            }, function error(response) {
                console.log("No response");
            });
        };

        this.start = function () {
            // TODO: run intro 2 (pause interval)
            var self = this;

            timeLeft = self.quiz.getConfig("TIMELIMIT") * 60;
            if (interval) {
                $interval.cancel(interval);
            }
            interval = $interval(function () {
                self.timerValue = 100 / (self.quiz.getConfig("TIMELIMIT") * 60) * timeLeft--;
            }, 1000);

            var set;
            if(QuizFactory.getConfig("SHUFFLEQUESTIONS")) {
                set = shuffleArray(this.quiz.getQuestions());
            } else {
                set = this.quiz.getQuestions();
            }
            var size = self.quiz.getConfig("SETLIMIT");
            if(size > self.quiz.getQuestions().length) {
                size =  self.quiz.getQuestions().length;
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
            var msg = false;
            if (msg = prompt("Send message, question #" + id, "Message text")) {
                $http({
                    method: 'GET',
                    url: "/feedback",
                    params: {
                        question: id,
                        message: msg
                    }
                });
            }
        };

        this.next = function () {
            $mdToast.hide();
            this.submitted = false;
            this.isCorrect = false;
            this.answer = "";
            this.showAnswers = QuizFactory.getConfig("SHOWANSWERS");
            if (this.set.pos < this.set.questions.length) {
                this.set.current = this.set.questions[this.set.pos];
                if(this.showAnswers) {
                    this.answer = this.set.current.answers.length > 0 ? this.set.current.answers[0] : "";
                }
                if(QuizFactory.getConfig("SHUFFLEANSWERS")) {
                    this.set.current.variants = shuffleArray(this.set.current.variants);
                }
                this.set.pos++;
                this.answers = [];
            } else {
                var history = localStorageService.get("history") || [];
                history.push({
                    "correct":this.correctCount,
                    "incorrect":this.incorrectCount,
                    "date":Date.now()
                });
                this.end = true;
                localStorageService.set("history", history);
                alert("Great! Correct answer " + this.correctCount + ", incorrect answer " + this.incorrectCount + ", correct percent " + Math.round(this.correctCount / this.set.questions.length * 100) + "%");
            }
        };

        this.before = function () {
            if (this.set.pos > 1) {
                --this.set.pos;
                this.set.current = this.set.questions[this.set.pos - 1];
                if(!angular.isUndefined(this.disabled[this.set.current.id])) {
                    if(Array.isArray(this.disabled[this.set.current.id])) {
                        this.answers = this.disabled[this.set.current.id];
                    } else {
                        this.answer = this.disabled[this.set.current.id];
                    }
                    this.submitted = true;
                }
            }
        };

        this.submit = function () {
            var self = this;
            if (this.submitted) {
                this.next();
            } else {
                // TODO: check value answer
                this.showAnswers = true;
                this.submitted = true;
                this.disabled[this.set.current.id] = this.set.current.variants.length > 0 ? this.answers : this.answer;
                if(this.set.current.variants.length > 0) {
                    var correctCount = 0;
                    angular.forEach(this.set.current.variants, function(value, key) {
                        if (value.isCorrect) {
                            correctCount++;
                        }
                    });
                    this.isCorrect = this.answers.length && (this.answers.length === correctCount);
                    if(this.isCorrect) {
                        angular.forEach(this.answers, function(value, key) {
                            if (!value.isCorrect) {
                                self.isCorrect = false;
                            }
                        });
                    }
                } else {
                    this.isCorrect = this.set.current.answers.indexOf(this.answer) > -1;
                }
                this.answer = this.set.current.answers.length > 0 ? this.set.current.answers[0] : "";

                if(this.isCorrect) {
                    this.correctCount++;
                    if (self.quiz.getConfig("SKIPCORRECT")) {
                        var answered = localStorageService.get("answered") || [];
                        answered.push({
                            "quiz": self.quiz.getConfig("QUIZ"),
                            "questionId": this.set.current.id
                        });
                        localStorageService.set("answered", answered);
                    }
                } else {
                    this.incorrectCount++;
                }

                $mdToast.show({
                    hideDelay   : 0,
                    position    : 'bottom right',
                    controller  : 'AnswerToastController',
                    templateUrl : 'app/templates/answer-toast.tmpl.html',
                    bindToController: true,
                    locals: {
                        isCorrect: this.isCorrect,
                        hint: this.set.current.hint
                    }
                });
            }
        };

        this.showSettings = function (ev) {
            $mdDialog.show({
                controller: "DialogController",
                templateUrl: 'app/templates/settings.tmpl.html',
                targetEvent: ev,
                clickOutsideToClose: false
            });
        };

        this.showHistory = function (ev) {
            $mdDialog.show({
                controller: "DialogController",
                templateUrl: 'app/templates/history.tmpl.html',
                targetEvent: ev,
                clickOutsideToClose: false
            });
        };

        this.showInfo = function (ev) {
            $mdDialog.show({
                controller: "DialogController",
                templateUrl: 'app/templates/info.tmpl.html',
                targetEvent: ev,
                clickOutsideToClose: false
            });
        };

        this.showHint = function (ev) {
            $rootScope.$broadcast("SHOWHINT", {"hint": self.set.current.hint});
        };

        $rootScope.$on("SHOWHINT", function(event, args) {
            $mdDialog
                .show($mdDialog
                    .alert()
                    .title('More info goes here.')
                    .htmlContent($sce.trustAsHtml("<strong>" + args.hint + "</strong><hr><br><iframe style='border:none;' height='600' width='9' sandbox='allow-forms allow-scripts' src='http://sandbox.onlinephpfunctions.com'></iframe>"))
                    .ariaLabel('More info')
                    .ok('Got it')
                    .targetEvent(event)
                ).then(function() {
                    $rootScope.$broadcast("HINTCLOSE");
                });
        });

        $rootScope.$on("START", function(event, args) {
            self.start();
        });

        $rootScope.$on("GOTO", function(event, args) {
            var current;
            angular.forEach(self.quiz.getQuestions(), function (value, key) {
                if(value.id == args.id) {
                    current = value;
                }
            });

            self.set.current = current;
        });
    }

    angular.module('quiz-client').controller('QuizController', QuizController);
})();
