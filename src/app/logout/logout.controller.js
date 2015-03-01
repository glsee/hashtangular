'use strict';

function LogoutCtrl($auth) {
  var init = function() {
    if (!$auth.isAuthenticated()) {
      return;
    }

    $auth.logout()
      .then(function() {
        console.debug('logged out');
      })
      .catch(function(response) {
        console.error('failed to log out');
      });
  };

  init();
}

LogoutCtrl.$inject = [
  '$auth'
];

angular.module('hashtangular')
  .controller('LogoutCtrl', LogoutCtrl);

