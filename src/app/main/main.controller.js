'use strict';

function MainCtrl($scope, $stateParams, $state, $document, TweetsChoreo) {
  var tweetsChoreo;

  var init = function() {
    $scope.isSearching = false;
    $scope.isLoadingMore = false;
    $scope.search = decodeURIComponent($stateParams.search);

    if ($scope.search) {
      searchTweets();
    }
  };

  var searchTweets = function() {
    $scope.isSearching = true;

    // Add the tweets Choreo
    tweetsChoreo = TweetsChoreo.initialize();

    // only cache for the first search on a search term
    if (!$scope.isLoadingMore) {
      $scope.cachedSearch = $scope.search;
    }

    // Add inputs
    tweetsChoreo.setInput('Query', $scope.search);

    if ($scope.isLoadingMore) {
      console.log($scope.tweets[$scope.tweets.length-1].id_str);
      tweetsChoreo.setInput('MaxId', $scope.tweets[$scope.tweets.length-1].id_str);
    }

    // Run the Choreo, specifying success and error callback handlers
    tweetsChoreo.execute().then(showResult, showError);
  };

  // Success callback
  var showResult = function(data) {
    var response;

    if (!$scope.isLoadingMore) {
      $scope.tweets = [];
    }

    if (data.Response) {
      response = JSON.parse(data.Response);
      $scope.tweets = $scope.tweets.concat(response.statuses);
      console.log($scope.tweets);
    }

    $scope.isSearching = false;
    $scope.isLoadingMore = false;
    $scope.$apply();
  };

  // Error callback
  var showError = function(error) {
    var message, matches;

    if(error.type === 'DisallowedInput') {
      console.log(error.type + ' error: ' + error.inputName);
    } else {
      console.log(error.type + ' error: ' + error.message);
    }

    try {
      message = JSON.parse(error.message);
      matches = message.execution.lasterror.match(/\{.*"message":"(.+?)"\}/);
      $scope.error_message = matches[1];
    } catch (e) {
      $scope.error_message = 'Message from the proxy server: ' + error.message;
    }

    $scope.isSearching = false;
    $scope.isLoadingMore = false;
    $scope.searchForm.search.$setValidity('server', false);
    $scope.$apply();
  };

  $scope.clickSearch = function() {
    if ($stateParams.search !== $scope.search) {
      $state.go('main', {search: $scope.search});
    } else {
      searchTweets();
    }
  };

  $scope.clickLoadMore = function() {
    $scope.isLoadingMore = true;
    searchTweets();
  };

  $scope.clickBackToTop = function() {
    $document.scrollTopAnimated(0);
  };

  init();
}

MainCtrl.$inject = [
  '$scope',
  '$stateParams',
  '$state',
  '$document',
  'TweetsChoreo'
];

angular.module('hashtangular')
  .controller('MainCtrl', MainCtrl);
