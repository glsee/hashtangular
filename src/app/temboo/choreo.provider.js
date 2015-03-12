'use strict';

function TweetsChoreo() {
  // Client proxy
  // You may need to adjust the path to reflect the URI of your server proxy
  this.proxy_url = '';

  var temboo, tweetsChoreo;

  var createTembooProxy = function(proxy_url) {
    temboo = new TembooProxy(proxy_url);
  };

  var createTweetsChoreo = function() {
    tweetsChoreo = temboo.addChoreo('jsTweets');
  };

  this.$get = function($q) {
    return {
      initialize: function() {
        if (!temboo) {
          createTembooProxy(this.proxy_url);
        }
        if (temboo) {
          createTweetsChoreo();
        }
        return this;
      },
      setInput: function(param, value) {
        if (!temboo || !tweetsChoreo) {
          this.initialize();
        }
        tweetsChoreo.setInput(param, value);
      },
      execute: function() {
        if (!temboo || !tweetsChoreo) {
          this.initialize();
        }
        var deferred = $q.defer();
        tweetsChoreo.execute(
          function (outputs, outputFilters) {
            deferred.resolve(outputs);
          },
          function (error) {
            deferred.reject(error);
          }
        );
        return deferred.promise;
      },
      proxy_url: this.proxy_url
    };
  };
}

angular.module('hashtangular')
  .provider('TweetsChoreo', TweetsChoreo);
