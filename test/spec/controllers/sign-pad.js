'use strict';

describe('Controller: SignPadCtrl', function () {
  beforeEach(module('ngSignPadApp'));

  var SignPadCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignPadCtrl = $controller('SignPadCtrl', {
      $scope: scope
    })
  }));

  it('should have a list of params', function () {
    expect(scope.params).toBeDefined();
  });
})
