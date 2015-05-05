angular.module('objectTable').controller('objectTableCtrl', ['$scope', '$timeout','$element', '$attrs','$http', '$compile', '$controller',
	function angTableCtrl($scope, $timeout, $element, $attrs, $http, $compile, $controller, objectTableSortingCtrl) {

		$controller('objectTableSortingCtrl', {$scope: $scope});

		this.init = function(){
			$scope.headers = [];
			$scope.fields = [];
			$scope.display = $scope.display || 5;
			$scope.pagging = angular.isDefined($scope.pagging) ? $scope.pagging : true;
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
				$scope.loadExternalData($attrs.fromUrl);
			};
		};

		$scope.loadExternalData = function(url){
			$scope.dataIsLoading= true;
			$http.get(url).then(function(response){
				$scope.data = response.data;
				$scope.dataIsLoading = false;
			});
			
		};

		this.addHeaderPattern = function(node){
			$scope.customHeader = true;
			$element.find("table").prepend(node);
		};

		this.addRowPattern = function(node, filter){
			node = this.checkEditableContent(node);
			var tr = angular.element(node).find("tr");
			tr.attr("ng-repeat","item in data" + filter);
			tr.attr("ng-click","setSelected(item)");
			tr.attr("ng-class","{'selected-row':item.$$hashKey==data.selected.$$hashKey}");

			$element.find("table").append(node.outerHTML);
			$compile($element.find("table"))($scope);
		};

		this.checkEditableContent = function(node){
			[].forEach.call(node.querySelectorAll("[editable]"), function(td){
				var innerModel = td.innerHTML.replace("::","").replace("{{","").replace("}}","");
				td.innerHTML = "<span contentEditable ng-model='" +innerModel+ "'>" +td.innerHTML.replace("::","")+ "</span>";
			});
			return node;
		},

		this.setCurrentPage = function(_currentPage){
			$scope.currentPage = _currentPage
		};

		$scope.setSelected = function(item){
			$scope.data.selected = item;
		};

	}]);