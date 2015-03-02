'use strict';

function twemojiParser() {
  return function(string) {
    return twemoji.parse(string);
  };
}

angular
  .module('hashtangular.filters.twemoji', [])
  .filter('twemoji', twemojiParser);
