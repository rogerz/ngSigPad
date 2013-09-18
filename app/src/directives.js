'use strict';

var app = angular.module('ngSignPadApp');

app.directive('signPad', function ($window) {
  function controller($scope) {
    function Param(name, value, min, max, step) {
      this.name = name;
      this.value = value;
      this.min = min;
      this.max = max;
      this.step = step;
    }
    $scope.params = [
      new Param('min', 10, 5, 20, 1),
      new Param('max', 15, 5, 20, 1),
      new Param('red', 125, 0, 255, 1),
      new Param('green', 125, 0, 255, 1),
      new Param('blue', 125, 0, 255, 1),
      new Param('smooth', 70, 0, 100, 1)
    ];
  }

  return {
    controller: controller,
    templateUrl: 'src/sign-pad-tpl.html',
    restrict: 'E',
    link: function (scope, elem) {
      var canvas = elem.find('canvas')[0];

      /* global SignaturePad:false */
      var signPad = new SignaturePad(canvas);

      // https://github.com/szimek/signature_pad/blob/gh-pages/js/app.js
      //
      // Adjust canvas coordinate space taking into account pixel ratio,
      // to make it look crisp on mobile devices.
      // This also causes canvas to be cleared.
      function resizeCanvas() {
        var ratio =  $window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
      }

      $window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      scope.pad = {
        clear: function () {signPad.clear(); },
        replay: function () {signPad.replay(); }
      };

      function updateConfig() {
        var params = scope.params;
        var vals = {};
        for (var i = 0; i < params.length; i++) {
          var param = params[i];
          vals[param.name] = param.value;
        }
        var opts = {
          minWidth: parseFloat(vals.min),
          maxWidth: parseFloat(vals.max),
          color: 'rgb(' + vals.red + ',' + vals.green + ',' + vals.blue + ')',
          velocityFilterWeight: 1 - vals.smooth / 100
        };
        signPad.config(opts);
      }

      for (var key in scope.params) {
        scope.$watch('params.' + key, updateConfig);
      }
    }
  };
});
