'use strict';

var app = angular.module('ngSignPadApp');

app.controller('SignPadCtrl', [
  '$scope',
  function ($scope) {
    $scope.params = {
      min: 10,
      max: 15,
      red: 127,
      green: 127,
      blue: 127,
      smooth: 70
    };

    $scope.format = function (value) {
      return value.toString();
    };

    $scope.config = {show: true, label: 'config'};
    $scope.$watch('config.show', function () {
      $scope.config.label = $scope.config.show ? 'hide' : 'config';
    });
  }
]);
