'use strict';

var app = angular.module('ngSignPadApp');

app.directive('signPad', function ($window) {
  return {
    templateUrl: 'directives/sign-pad.html',
    restrict: 'E',
    link: function (scope, elem) {
      var canvas = elem.find('canvas')[0];

      /* global SignaturePad:false */
      var signPad = new SignaturePad(canvas);
      scope.signPad = signPad;

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

      elem.find('#sign-pad-clear').on('click', function () {
        signPad.clear();
      });

      elem.find('#sign-pad-save').on('click', function () {
        console.log('save sign');
      });
    }
  };
});
