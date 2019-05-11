'use strict';

class AnswerToastController {
  /* @ngInject */
  constructor($rootScope, $scope, $mdToast, isCorrect, hint, hintUrl) {
    let isDlgOpen;

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
      if (isDlgOpen) return;
      isDlgOpen = true;

      $rootScope.$broadcast('SHOWHINT', {'hint': hint, 'hintUrl': hintUrl});
    };

    $rootScope.$on('HINTCLOSE', function() {
      isDlgOpen = false;
    });
  }
}

module.exports = AnswerToastController;
