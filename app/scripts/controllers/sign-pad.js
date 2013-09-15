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

    $scope.config = {show: true};
    $scope.toggleConfig = function () {
      var config = $scope.config;
      config.show = !config.show;
    };

    function updateConfig() {
      var params = $scope.params;
      var opts = {
        minWidth: parseFloat(params.min),
        maxWidth: parseFloat(params.max),
        color: 'rgb(' + params.red + ',' + params.green + ',' + params.blue + ')',
        velocityFilterWeight: 1 - params.smooth / 100
      };
      $scope.signPad.config(opts);
    }

    for (var key in $scope.params) {
      $scope.$watch('params.' + key, updateConfig);
    }
  }
]);
