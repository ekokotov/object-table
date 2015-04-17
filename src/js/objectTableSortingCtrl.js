angular.module('objectTable').controller('objectTableSortingCtrl', ['$scope',
	function angTableCtrl($scope) {


		/* sorting [START]*/

		$scope.sort = {
                    fields: [], // array to store readable sorted headers
                    reverse: [] // array to store reversing for each field
                };

                $scope.sortingArray = [];

                $scope.changeSorting = function(field) {
                	if ($scope.data.length) {
                		if ($scope.sortingType == 'compound') {
                			var sortedHeader = field,
                			sortProperty= $scope.fields[$scope.headers.indexOf(field)];
                			if ($scope.sort.fields.indexOf(sortedHeader) == -1) {
                				$scope.sort.fields.push(sortedHeader);
                				$scope.sortingArray.push(sortProperty);
                				$scope.sort.reverse.push(false);
                			} else {
                				var index = $scope.sort.fields.indexOf(sortedHeader);
                				$scope.sort.reverse[index] = !$scope.sort.reverse[index];
                				if ($scope.sort.reverse[index]) {
                					$scope.sortingArray[index] = "-" + sortProperty;
                				} else {
                					$scope.sortingArray[index] = sortProperty;
                				}
                			}

                		} else if ($scope.sortingType == 'simple') {
                			$scope.sort.reverse[0] = !$scope.sort.reverse[0];
                			$scope.sort.fields = [field];
                			if ($scope.sort.reverse[0]) {
                				$scope.sortingArray = [sortProperty];
                			} else {
                				$scope.sortingArray = ["-" + sortProperty];
                			};
                		}
                	}

                };

                /* highlight sorted headers */
                $scope.headerIsSortedClass = function(field) {
                	if (!$scope.sortingArray.length) return;

                	if ($scope.sortingType == 'simple') {
                		if (field == $scope.sort.fields[0] || "-" + field == $scope.sort.fields[0]) {
                			if ($scope.sort.reverse[0]) {
                				return 'table-sort-up';
                			} else {
                				return 'table-sort-down';
                			}
                		}
                	} else if ($scope.sortingType == 'compound') {
                		var rowIndex = $scope.sort.fields.indexOf($scope.headers[$scope.fields.indexOf(field)]);
                		if (rowIndex != -1) {
                			if ($scope.sort.reverse[rowIndex]) {
                				return 'table-sort-up';
                			} else {
                				return 'table-sort-down';
                			}
                		}
                	}
                };

                /* COMPOUND SORTING: remove from array */
                $scope.removeSorting = function() {
                	var index = $scope.sort.fields.indexOf(this.sortField);
                	if (index > -1) {
                		$scope.sort.fields.splice(index, 1);
                		$scope.sort.reverse.splice(index, 1);
                		$scope.sortingArray.splice(index, 1);
                	}
                };
                /* sorting [END]*/

            }]);