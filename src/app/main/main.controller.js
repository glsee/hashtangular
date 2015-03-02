'use strict';

function MainCtrl($scope) {
  var temboo, tweetsChoreo;

  var init = function() {
    // Instantiate the client proxy
    // You may need to adjust the path to reflect the URI of your server proxy
    temboo = new TembooProxy('http://localhost:3000/proxy-server');

    // Add the tweets Choreo
    tweetsChoreo = temboo.addChoreo('jsTweets');
  };

  $scope.searchTweets = function() {
    var q = $scope.search;

    // Add inputs
    tweetsChoreo.setInput('Query', q);

    // Run the Choreo, specifying success and error callback handlers
    tweetsChoreo.execute(showResult, showError);
  };

  // Success callback
  var showResult = function(outputs, outputFilters) {
    var response;

    if (outputs.Response) {
      console.log(outputs);
      response = JSON.parse(outputs.Response);
      $scope.tweets = response.statuses;
      $scope.$apply();
      console.log($scope.tweets);
    }
  };

  // Error callback
  var showError = function(error) {
    if(error.type === 'DisallowedInput') {
      console.log(error.type + ' error: ' + error.inputName);
    } else {
      console.log(error.type + ' error: ' + error.message);
    }
  };

  $scope.search = "#sumup";

  init();
}

MainCtrl.$inject = [
  '$scope'
];

angular.module('hashtangular')
  .controller('MainCtrl', MainCtrl);
