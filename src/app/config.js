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
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl',
      resolve: {
        authenticated: function ($q, $location, $auth) {
          var deferred = $q.defer();

          if ($auth.isAuthenticated()) {
            $location.url('/');
            deferred.resolve(true);
          } else {
            deferred.resolve(false);
          }

          return deferred.promise;
        }
      }
    })
    .state('logout', {
      url: '/logout',
      template: null,
      controller: 'LogoutCtrl'
    })
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
