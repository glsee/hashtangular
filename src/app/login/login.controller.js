'use strict';

function LoginCtrl($scope, $auth) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        console.debug('authenticated');
      })
      .catch(function(response) {
        console.error('authentication failed');
      });
  };
}

LoginCtrl.$inject = [
  '$scope',
  '$auth'
];

angular.module('hashtangular')
  .controller('LoginCtrl', LoginCtrl);

