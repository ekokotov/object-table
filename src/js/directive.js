'use strict'
angular.module('objectTable').directive('objectTable', ['$compile','$interpolate',function($compile, $interpolate) {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: '/src/templates/common.html',
    controller: 'objectTableCtrl',
    controllerAs: 'ctrl',
    transclude: true,
    scope: {
      data: '=',
      display: '=?',
      resize: '=?',
      paging: '=?',
      fromUrl: '@',
      //search:"@?",
      //headers:"@",
      //fields:"@",
      sortingType: '@?sorting',
      editable: '&?',
      onEdit: '&?',
      select: '@?',
      selectedModel: '=?',
      dragColumns: '=?'

    },
    compile: function(tElement, tAttributes) {

      //collect filters
      var rowFilter = '',
      pagingFilter = '';

      // additional user filters
      if (!!tAttributes.addFilter) {
        rowFilter += tAttributes.addFilter;
      }

      //If SORTING allowed
      if (tAttributes.sorting !== 'false') {
        rowFilter += '| orderBy:sortingArray';
      }

      // add 'allow-drag' attribute to header is just cistom tbody present
      if (tAttributes.dragColumns) {
        tElement.find('th').attr('allow-drag','');
      }

      //If SEARCH allowed
      if (tAttributes.search === 'separate') {
        tAttributes.fields.split(',').forEach(function(item, index) {
          rowFilter += '| filter:{\'' + item.trim() + '\':columnSearch[\'' + item + '\']}';
        });

      } else if (typeof(tAttributes.search) === 'undefined' || tAttributes.search === 'true') {
        rowFilter += '| filter:globalSearch';
      }

      //pagingFilter = rowFilter;
      pagingFilter += ' | offset: currentPage:display |limitTo: display';

      tElement[0].querySelector('#rowTr').setAttribute('ng-repeat','item in $parent.$filtered = (data' + rowFilter + ')' + pagingFilter);
      //add paging
      tElement.find('paging').attr('count','$filtered.length');

      return function preLink(scope, element, attrs, ctrl, transclude) {
        ctrl._init();
        transclude(scope, function(clone, innerScope) {
          scope.$owner = innerScope.$parent;
          for (var key in clone) {
            if (clone.hasOwnProperty(key)) {
              switch (clone[key].tagName) {
                case 'THEAD':
                  ctrl._addHeaderPattern(clone[key]);
                break;
                case 'TBODY':
                  scope.findBody = true;
                  ctrl._addRowPattern(clone[key],rowFilter,pagingFilter);
                break;
                case 'TFOOT':
                  ctrl._addFooterPattern(clone[key]);
                break;
              }
            }
          }
        });

      }; //[END transclude]

    },

  };

}]);
