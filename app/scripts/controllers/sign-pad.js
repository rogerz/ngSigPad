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

    $scope.config = {show: true, label: 'config'};
    $scope.toggleConfig = function () {
      var config = $scope.config;
      config.show = !config.show;
      config.label = config.show ? 'hide' : 'config';
    };

    function updateConfig() {
      console.log('config updated');
    }

    for (var key in $scope.params) {
      $scope.$watch('params.' + key, updateConfig);
    }
  }
]);
