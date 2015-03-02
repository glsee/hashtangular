'use strict';

function unixtime() {
  return function(timeString) {
    return new Date(timeString).getTime();
  };
}

angular
  .module('hashtangular.filters', [])
  .filter('unixtime', unixtime);
