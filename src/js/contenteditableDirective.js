'use strict'
angular.module('objectTable',[]).directive('contenteditable', function() {
  return {
    restrict: 'A',
    require: ['ngModel', '^objectTable'],
    link: function(scope, element, attrs, ctrls) {
      var ngModel = ctrls[0], objectTableCtrl = ctrls[1];
      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };

      element.bind('change blur', function() {
        var oldValue = ngModel.$viewValue.toString();
        var newValue = element.text();
        if (oldValue !== newValue) {
          scope.$apply(function() {
              ngModel.$setViewValue(newValue);
            });
          if (!!objectTableCtrl.onEdit && typeof objectTableCtrl.onEdit === 'function') objectTableCtrl.onEdit({$oldValue: oldValue, $newValue: newValue});
        }
      })
    }
  }
});
