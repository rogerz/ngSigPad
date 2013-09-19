'use strict';

describe('Directives: signPad', function () {
  var element, scope;

  beforeEach(module('ngSignPadApp'));
  beforeEach(module('src/sign-pad-tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    element = angular.element('<sign-pad></sign-pad>');
    scope = $rootScope;
    $compile(element)(scope);
    scope.$digest();
  }));

  it('should contain a canvas', function () {
    expect(element.find('canvas').length).toBe(1);
  });
});
