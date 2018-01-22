(function () {
    "use strict";

    function AnswerToastController($rootScope, $scope, $mdDialog, $mdToast, isCorrect, hint) {
        var isDlgOpen;

        $scope.isCorrect = isCorrect;
        $scope.closeToast = function() {
            if (isDlgOpen) return;

            $mdToast
                .hide()
                .then(function() {
                    isDlgOpen = false;
                });
        };

        $scope.openMoreInfo = function(e) {
            if ( isDlgOpen ) return;
            isDlgOpen = true;

            $rootScope.$broadcast("SHOWHINT", {"hint": hint});
        };

        $rootScope.$on("HINTCLOSE", function(event, args) {
            isDlgOpen = false;
        });
    }

    angular.module('quiz-client').controller('AnswerToastController', AnswerToastController);
})();
