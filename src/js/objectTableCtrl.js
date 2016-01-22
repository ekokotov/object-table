angular.module('objectTable').controller('objectTableCtrl', ['$scope', '$timeout','$element', '$attrs','$http', '$compile', '$controller', 'objectTableUtilService',
	function angTableCtrl($scope, $timeout, $element, $attrs, $http, $compile, $controller, Util) {

  $controller('objectTableSortingCtrl', {$scope: $scope});
  var ctrl = this;

  this._init = function() {
    $scope.headers = [];
    $scope.fields = [];
    $scope.display = $scope.display || 5;
    $scope.paging = angular.isDefined($scope.paging) ? $scope.paging : true;
    $scope.sortingType = $scope.sortingType || 'simple';
    $scope.currentPage = 0;
    $scope.customHeader = false;

    if ($attrs.search == 'separate') {
      $scope.search = 'separate';
      $scope.columnSearch = [];

      /* ## after changing search model - clear currentPage ##*/
    } else {
      /* 'separate' or 'true' or 'false '*/
      $scope.search = typeof($attrs.search) === 'undefined' || $attrs.search === 'true';
    }

    /* GET HEADERS */
    $scope.headers = Util.getArrayFromParams($attrs.headers,'headers');

    /* GET FIELDS */
    $scope.fields = Util.getArrayFromParams($attrs.fields,'fields');

    //LOAD FROM EXTERNAL URL
    if (!!$attrs.fromUrl) {
      this._loadExternalData($attrs.fromUrl);
    }

    if (!!$scope.onEdit) {
      this.onEdit = $scope.onEdit;
    }

    //reinitialize selected model
    $scope.selectedModel = $scope.select === 'multiply' ? [] : {};

  };

  this.onEdit = $scope.onEdit;

  this._loadExternalData = function(url) {
    $scope.dataIsLoading = true;
    $http.get(url).then(function(response) {
      $scope.data = response.data;
      $scope.dataIsLoading = false;
    });

  };

  this._addHeaderPattern = function(node) {
    $scope.customHeader = true;
    //add Index to drag
    Array.prototype.forEach.call(node.querySelectorAll('[allow-drag]'), function(th, index) {
      th.setAttribute('index',index);
    });
    node.removeAttribute('ng-non-bindable');
    $element.find('table').prepend(node);
  };

  this._addFooterPattern = function(node) {
    $element.find('table').prepend(node);
  };

  this._addRowPattern = function(node, rowFilter, paggingFilter) {
    this._checkEditableContent(node);
    this._addRepeatToRow(node, rowFilter, paggingFilter);
    node.removeAttribute('ng-non-bindable');
    //compile TBODY
    $element.find('table').append(node.outerHTML);
    this.bodyTemplate = node.innerHTML;
    $compile($element.find('tbody'))($scope);
  };

  this._addRepeatToRow = function(node, rowFilter, paggingFilter) {
    var tr = angular.element(node).find('tr');

    tr.attr('ng-repeat','item in $filtered = (data' + rowFilter + ')' + paggingFilter);
    if (!tr.attr('ng-click')) {
      tr.attr('ng-click','setSelected(item)');
    }

    tr.attr('ng-class','{\'selected-row\':ifSelected(item)}');
  };

  this._checkEditableContent = function(node) {
    var innerModel, findModelRegex = /\{\{:*:*(.*?)\}\}/g;
    Array.prototype.forEach.call(node.querySelectorAll('[editable]'), function(td) {
      innerModel = td.innerHTML.replace(findModelRegex,'$1');
      td.innerHTML = '<div contentEditable ng-model=\'' + innerModel + '\'>{{' + innerModel + '}}</div>';
    });
  };

  this.setCurrentPage = function(_currentPage) {
    $scope.currentPage = _currentPage;
  };

  $scope.setSelected = function(item) {
    if ($scope.select === 'multiply') {
      if (!ctrl._containsInSelectArray(item)) {
        $scope.selectedModel.push(item);
      }else {
        $scope.selectedModel.splice($scope.selectedModel.indexOf(item),1);
      }
    }else {
      $scope.selectedModel = item;
    }
  };

  this._containsInSelectArray = function(obj) {
    if ($scope.selectedModel.length)
				return $scope.selectedModel.filter(function(listItem) {
  return angular.equals(listItem, obj);
				}).length > 0;
  };

  $scope.ifSelected = function(item) {

    if (!!$scope.selectedModel && $scope.select === 'multiply') {
      return ctrl._containsInSelectArray(item);
    }else {
      return item.$$hashKey == $scope.selectedModel.$$hashKey;
    }
  };

  /* Drag-n-Drop columns exchange*/
  this.changeColumnsOrder = function(from, to) {
    $scope.$apply(function() {
      $scope.fields.swap(from,to);
      $scope.headers.swap(from,to);
      if (!!$scope.columnSearch) {
        $scope.columnSearch.swap(from,to);
      }
      if (!!ctrl.bodyTemplate) {
        var tds = angular.element(ctrl.bodyTemplate).children(),
        html = '',
        tr  = document.createElement('tr'),
        tbody  = document.createElement('tbody'),
        attributes = $element.find('tbody').find('tr')[0].attributes;
        Array.prototype.swap.apply(tds,[from,to]);

        [].forEach.call(attributes, function(attr, index) {
          tr.setAttribute(attr.name, attr.value);
        });

        for (var i = 0,length = tds.length; i < length; i++) {
          tr.appendChild(tds[i]);
        }

        tbody.appendChild(tr);

        $element.find('tbody').replaceWith(tbody);
        ctrl.bodyTemplate = tbody.innerHTML;
        $compile($element.find('tbody'))($scope);
      }
      if ($scope.customHeader) {
        var ths = $element.find('th'),
        tr  = document.createElement('tr'),
        thead  = document.createElement('thead');

        Array.prototype.swap.apply(ths,[from,to]);

        for (var i = 0, length = ths.length; i < length; i++) {
          tr.appendChild(ths[i]);
        };
        thead.appendChild(tr);
        $element.find('thead').replaceWith(thead);

      }
      if (!!ctrl.pageCtrl)
      ctrl.pageCtrl.setPage(0);
    });
  };

  $scope.setCurrentPageForPageCtrl = function(_currentPage) {
    if (!!ctrl.pageCtrl) ctrl.pageCtrl.setPage(_currentPage);
  }

}]);
