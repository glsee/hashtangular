'use strict';

function LogoutCtrl($auth, $location) {
  var init = function() {
    if (!$auth.isAuthenticated()) {
      $location.url('/login');
      return;
    }

    $auth.logout()
      .then(function() {
        console.log('logged out');
        $location.url('/login');
      })
      .catch(function(response) {
        console.error('failed to log out');
        $location.url('/');
      });
  };

  init();
}

LogoutCtrl.$inject = [
  '$auth',
  '$location'
];

angular.module('hashtangular')
  .controller('LogoutCtrl', LogoutCtrl);

