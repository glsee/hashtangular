'use strict';

function config
  (
    $stateProvider,
    $urlRouterProvider,
    $httpProvider,
    TweetsChoreoProvider,
    proxy_url
  )
{

  $httpProvider.defaults.headers.common['Accept']= 'application/json';

  $stateProvider
    .state('main', {
      url: '/{search:.*}',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('/');

  TweetsChoreoProvider.proxy_url = proxy_url;
}

angular
  .module('hashtangular')
  .config(config)
;
