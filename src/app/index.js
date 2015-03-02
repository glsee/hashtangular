'use strict';

angular
  .module(
    'hashtangular',
    [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'hashtangular.filters.unixtime',
      'hashtangular.filters.twemoji'
    ]
  )
;
