angular.module('objectTable').controller('objectTableSortingCtrl', ['$scope',
    function angTableCtrl($scope) {


        /* sorting [START]*/

        $scope.sort = {
            fields: [], // array to store readable sorted headers
            reverse: [] // array to store reversing for each field
        };

        $scope.sortingArray = [];

        $scope.sortBy = function(field) {
            if ($scope.data.length) {
                var sortedHeader = $scope.headers[$scope.fields.indexOf(field)];
                if ($scope.sortingType == 'compound') {

                    if ($scope.sort.fields.indexOf(sortedHeader) == -1) {
                        $scope.sort.fields.push(sortedHeader);
                        $scope.sortingArray.push(field);
                        $scope.sort.reverse.push(false);
                    } else {
                        $scope.changeReversing(field, $scope.sort.fields.indexOf(sortedHeader));
                    }

                } else if ($scope.sortingType == 'simple') {
                    $scope.sort.fields = [sortedHeader];
                    $scope.changeReversing(field);

                }

            }


        };

        $scope.changeReversing = function(sortProperty, indexOfHeader) {
            if ($scope.sortingType == 'compound') {
                $scope.sort.reverse[indexOfHeader] = !$scope.sort.reverse[indexOfHeader];
                $scope.sortingArray[indexOfHeader] = $scope.sort.reverse[indexOfHeader] ? "-" + sortProperty : sortProperty;
            } else if ($scope.sortingType == 'simple') {
                $scope.sort.reverse[0] = !$scope.sort.reverse[0];
                $scope.sortingArray = $scope.sort.reverse[0] ? [sortProperty] : ["-" + sortProperty];
            }
        };

        /* highlight sorted headers */
        $scope.headerIsSortedClass = function(field) {
            if (!$scope.sortingArray.length) return;

            if ($scope.sortingType == 'simple') {
                if (field == $scope.sort.fields[0] || "-" + field == $scope.sort.fields[0]) {
                    return $scope.sort.reverse[0] ? 'table-sort-down' : 'table-sort-up';
                }
            } else if ($scope.sortingType == 'compound') {
                var rowIndex = $scope.sort.fields.indexOf(field);
                if (rowIndex != -1) {
                    return $scope.sort.reverse[rowIndex] ? 'table-sort-down' : 'table-sort-up';
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
            index = null;
        };
        /* sorting [END]*/


        /* column resizing*/
        var pressed = false,
        start,startX, startWidth;

        $scope.resizeStart = function(e) {
            if (e.target.classList.contains("resize")) {
                start = e.target.parentNode;
                pressed = true;
                startX = e.pageX;
                startWidth = e.target.parentNode.offsetWidth;
                document.addEventListener('mousemove', drag);
            }
        };

        function drag(e) {
            if (pressed) {
                start.width = startWidth + (e.pageX - startX);
            }
        }

        $scope.resizeEnd = function(e) {
            if (pressed) {
                document.removeEventListener('mousemove', drag);
                pressed = false;
            }
        };

    }
]);