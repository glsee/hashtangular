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
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('/');
}

angular
  .module('hashtangular')
  .config(config)
;
