angular.module('objectTable').controller('pagingTableCtrl', ['$scope', '$element', '$attrs',
	function ($scope, $element, $attrs) {

		$scope.currentPage = 0;


		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
			$scope.setCurrentPageToTable();
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
			$scope.setCurrentPageToTable();
		};

		$scope.setCurrentPageToTable = function (){
			$scope.objectTableCtrl.setCurrentPage($scope.currentPage);
		};

		$scope.prevPageDisabled = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.pageCount = function () {
			return $scope.count>0 ?Math.ceil($scope.count/$scope.display)-1: 0;
		};

		$scope.nextPageDisabled = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function(n) {
			$scope.currentPage = n;
			$scope.setCurrentPageToTable();
		};


		$scope.range = function () {
			var rangeSize = $scope.pageCount()+1 <5 ?$scope.pageCount()+1 :5;

			var ret = [];
			var start = $scope.currentPage;

			if ( start > $scope.pageCount()-rangeSize ) {
				start = $scope.pageCount()-rangeSize+1;
			}

			for (var i=start; i<start+rangeSize; i++) {
				ret.push(i);
			}
			return ret;
		};


	}]);
