'use strict';

var app = angular.module('ngSignPadApp');

app.controller('SignPadCtrl', [
  '$scope',
  function ($scope) {
    function Param(label, value, parseFn) {
      this.label = label;
      this.value = value;
      this.parse = parseFn || String;
    }

    $scope.params = {
      maxWidth: new Param('max', 2.5, parseFloat),
      color: new Param('color', 'black', String)
    };

    function updateConfig() {
      var opt = {};
      for (var key in $scope.params) {
        var param = $scope.params[key];
        opt[key] = param.parse(param.value);
      }
      $scope.signPad.config(opt);
    }

    for (var key in $scope.params) {
      var param = $scope.params[key];
      $scope.$watch(param.value, updateConfig);
    }
  }
]);
