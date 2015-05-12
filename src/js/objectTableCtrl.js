angular.module('objectTable').controller('objectTableCtrl', ['$scope', '$timeout','$element', '$attrs','$http', '$compile', '$controller',
	function angTableCtrl($scope, $timeout, $element, $attrs, $http, $compile, $controller, objectTableSortingCtrl) {

		$controller('objectTableSortingCtrl', {$scope: $scope});
		var ctrl = this;

		this._init = function(){
			$scope.headers = [];
			$scope.fields = [];
			$scope.display = $scope.display || 5;
			$scope.paging = angular.isDefined($scope.paging) ? $scope.paging : true;
			$scope.sortingType = $scope.sortingType || "simple";
			$scope.currentPage = 0;
			$scope.customHeader = false;

			
			/* 'separate' or 'true' or 'false '*/
			$scope.search = $attrs.search !=="separate"? (typeof($attrs.search)!=='undefined'? JSON.parse($attrs.search): true): $attrs.search ;

			if($scope.search =="separate"){
				$scope.columnSearch = [];
			};

			/* GET HEADERS */
			if(!!$attrs.headers){
				$attrs.headers.split(',').forEach(function(item){
					$scope.headers.push( item.trim() );
				});
			}else{
				throw "Required 'headers' attribute is not found!"
			};

			/* GET FIELDS */
			if(!$attrs.fields) throw "Sorting is allowed just with specified 'fields' attribute !";
			$attrs.fields.split(',').forEach(function(item){
				$scope.fields.push( item.trim() );
			});

			//LOAD FROM EXTERNAL URL
			if(!!$attrs.fromUrl){
				this._loadExternalData($attrs.fromUrl);
			};
		};

		this._loadExternalData = function(url){
			$scope.dataIsLoading= true;
			$http.get(url).then(function(response){
				$scope.data = response.data;
				$scope.dataIsLoading = false;
			});
			
		};

		this._addHeaderPattern = function(node){
			$scope.customHeader = true;
			$element.find("table").prepend(node);
		};

		this._addRowPattern = function(node, filter){
			node = this._checkEditableContent(node);
			var tr = angular.element(node).find("tr");
			tr.attr("ng-repeat","item in data" + filter);
			tr.attr("ng-click","setSelected(item)");
			tr.attr("ng-class","{'selected-row':ifSelected(item)}");

			$element.find("table").append(node.outerHTML);
			$compile($element.find("tbody"))($scope);
		};

		this._checkEditableContent = function(node){
			[].forEach.call(node.querySelectorAll("[editable]"), function(td){
				var innerModel = td.innerHTML.replace("::","").replace("{{","").replace("}}","");
				td.innerHTML = "<span contentEditable ng-model='" +innerModel+ "'>" +td.innerHTML.replace("::","")+ "</span>";
			});
			return node;
		};

		this.setCurrentPage = function(_currentPage){
			$scope.currentPage = _currentPage
		};

		$scope.setSelected = function(item){
			if(!$scope.data.selected){
				if( $scope.select==="multiply" ){
					$scope.data.selected = [];
				}
			}
			if( $scope.select==="multiply"){
				if(!ctrl._containsInSelectArray(item)){
					$scope.data.selected.push(item);
				}else{
					$scope.data.selected.splice($scope.data.selected.indexOf(item),1);
				}
			}else{
				$scope.data.selected = item;
			}
		};

		this._containsInSelectArray = function(obj) {
			return $scope.data.selected.filter(function(listItem) {
				return angular.equals(listItem, obj)
			}).length > 0;
		};

		$scope.ifSelected = function(item){
			if(!$scope.data.selected) return false;

			if( $scope.select==="multiply" ){
				return ctrl._containsInSelectArray(item);
			}else{
				return item.$$hashKey==$scope.data.selected.$$hashKey;
			}
		};

	}]);