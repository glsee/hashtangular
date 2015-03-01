'use strict';

function config
  (
    $stateProvider,
    $urlRouterProvider,
    $authProvider
  )
{
  $authProvider.twitter({
    url: 'https://hashtangular.herokuapp.com/auth/twitter'
  });

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl',
      resolve: {
        authenticated: function ($q, $location, $auth) {
          var deferred = $q.defer();

          if (!$auth.isAuthenticated()) {
            $location.url('/login');
            deferred.resolve(false);
          } else {
            deferred.resolve(true);
          }

          return deferred.promise;
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}

angular
  .module('hashtangular')
  .config(config)
;
