'use strict';

function twitterTextParser() {
  return function(string) {
    return twttr.txt.autoLink(string);
  };
}

angular
  .module('hashtangular.filters.twitter_text', [])
  .filter('twitter_text', twitterTextParser);
