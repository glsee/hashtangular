'use strict';

function config
  (
    $stateProvider,
    $urlRouterProvider
  )
{
  $stateProvider
    .state('home', {
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
