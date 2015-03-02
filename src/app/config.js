'use strict';

function config
  (
    $stateProvider,
    $urlRouterProvider,
    $httpProvider
  )
{

  $httpProvider.defaults.headers.common['Accept']= 'application/json';

  $stateProvider
    .state('main', {
      url: '/{search:[a-zA-Z0-9~_.!*\'(),%-]*}',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('/');
}

angular
  .module('hashtangular')
  .config(config)
;
