(function () {
    "use strict";

    function IntroController($scope, $cookies, ngIntroService) {
        this.autostart = angular.isUndefined($cookies.get('start-intro')) || $cookies.get('start-intro') != 2;
        this.options = {
            steps: [
                {
                    intro: "Hi, this is a interactive application for test knowledge",
                    position: 'right'
                },
                {
                    element: '#step-header',
                    intro: "This application name and selected quiz name",
                    position: 'bottom'
                },
                {
                    element: '#step-feedback',
                    intro: "Click this button for send feedback or error",
                    position: 'left'
                },
                {
                    element: '#step-start',
                    intro: "This button for start quiz (circle show remaining time)",
                    position: 'left'
                },
                {
                    element: '#step-hint',
                    intro: 'This get hint for current qustion',
                    position: 'left'
                },
                {
                    element: '#step-history',
                    intro: 'This get your quiz history',
                    position: 'left'
                },
                {
                    element: '#step-settings',
                    intro: 'This for set quiz settings',
                    position: 'left'
                },
                {
                    element: '#step-info',
                    intro: 'And this for get quiz information',
                    position: 'left'
                },
                {
                    element: '#step-question',
                    intro: 'This is a current question with question text and answer variants or answer input field',
                    position: 'left'
                },
                {
                    element: '#step-before',
                    intro: 'Click this button for back to previous question',
                    position: 'top'
                },
                {
                    element: '#step-submit',
                    intro: 'Click this button for submit answer',
                    position: 'top'
                },
                {
                    element: '#step-next',
                    intro: 'Click this button for back to next question',
                    position: 'top'
                },
                {
                    element: '#step-counter',
                    intro: 'This is counter right and fail answers (green/left right answers, red/right fail answers, hint show coefficient right answers to fail)',
                    position: 'top'
                },
                {
                    intro: 'Use application with fun! :)',
                    position: 'left'
                }
            ],
            showStepNumbers: false,
            showBullets: true,
            exitOnOverlayClick: false,
            exitOnEsc: true,
            nextLabel: 'next',
            prevLabel: 'Previous',
            skipLabel: 'Skip',
            doneLabel: 'Done!'
        };

        this.done = function() {
            $cookies.put('start-intro', 2);
        };
    }

    angular.module('quiz-client').controller('IntroController', IntroController);
})();
