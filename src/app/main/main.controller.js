'use strict';

function MainCtrl($scope, $stateParams, $state) {
  var temboo, tweetsChoreo;

  var init = function() {
    $scope.isSearching = false;
    $scope.isLoadingMore = false;
    $scope.search = decodeURIComponent($stateParams.search);

    // Instantiate the client proxy
    // You may need to adjust the path to reflect the URI of your server proxy
    temboo = new TembooProxy('http://localhost:3000/proxy-server');

    // Add the tweets Choreo
    tweetsChoreo = temboo.addChoreo('jsTweets');

    if ($scope.search) {
      searchTweets();
    }
  };

  var searchTweets = function() {
    $scope.isSearching = true;

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
    tweetsChoreo.execute(showResult, showError);
  };

  // Success callback
  var showResult = function(outputs, outputFilters) {
    var response;

    if (!$scope.isLoadingMore) {
      $scope.tweets = [];
    }

    if (outputs.Response) {
      console.log(outputs);
      response = JSON.parse(outputs.Response);
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

    message = JSON.parse(error.message);
    matches = message.execution.lasterror.match(/\{.*"message":"(.+?)"\}/)

    console.log(matches);

    $scope.error_message = matches[1];

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

  init();
}

MainCtrl.$inject = [
  '$scope',
  '$stateParams',
  '$state'
];

angular.module('hashtangular')
  .controller('MainCtrl', MainCtrl);
