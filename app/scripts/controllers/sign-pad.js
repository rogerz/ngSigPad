'use strict';

var app = angular.module('ngSignPadApp');

app.controller('SignPadCtrl', [
  '$scope',
  function ($scope) {
    // configurable parameters
    function Param(name, value, label, parseFn) {
      this.name = name;
      this.value = value;
      this.label = label || name;
      this.parse = parseFn || parseFloat;
    }

    $scope.params = [
      new Param('maxWidth', 2.5, 'max width'),
      new Param('minWidth', 0.5, 'min width'),
      new Param('velocityWeighFilter', 0.7, 'sensitivity'),
      new Param('color', 'black', 'color', String)
    ];

    function updateConfig() {
      var opts = {};
      for (var i in $scope.params) {
        var param = $scope.params[i];
        opts[param.name] = param.parse(param.value);
      }
      $scope.signPad.config(opts);
    }

    for (var i in $scope.params) {
      $scope.$watch('params[' + i + '].value', updateConfig);
    }

    $scope.config = {show: false, label: 'config'};
    $scope.$watch('config.show', function () {
      $scope.config.label = $scope.config.show ? 'hide' : 'config';
    });
  }
]);
