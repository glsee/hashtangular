'use strict';

function MainCtrl($scope) {
  $scope.searchTweets = function() {
    var q = encodeURIComponent($scope.search);
  };

  $scope.search = "#sumup";
}

MainCtrl.$inject = [
  '$scope'
];

angular.module('hashtangular')
  .controller('MainCtrl', MainCtrl);
