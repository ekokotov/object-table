angular.module('objectTable').controller('objectTableCtrl', ['$scope', '$element', '$attrs','$http','$q', '$compile','$timeout', '$controller', '$filter',
	function angTableCtrl($scope, $element, $attrs, $http, $q, $compile, $timeout, $controller, $filter) {

		this.init = function(){
			$scope.headers = [];
			$scope.fields = [];
			$scope.display = 5;
			$scope.currentPage = 0;

				// GET HEADERS
				if(!!$attrs.headers){
					$attrs.headers.split(',').forEach(function(item){
						$scope.headers.push( item.trim() );
					});
				};

			// GET FIELDSnk
			if(!!$attrs.fields){
				$attrs.fields.split(',').forEach(function(item){
					$scope.fields.push( item.trim() );
				});
			};

			//INIT pagging
			$scope.pagging = true;
			if(!!$attrs.pagging){
				$scope.pagging = Boolean.valueOf($attrs.pagging)();
			};

			//INIT search
			$scope.search = true;
			if(!!$attrs.search){
				$scope.search = Boolean.valueOf($attrs.search)();
			};

			//LOAD FROM EXTERNAL URL
			if(!!$attrs.fromUrl){
				$scope.loadExternalData($attrs.fromUrl);
			};

			if(!!$attrs.display){
				$scope.display = $attrs.display;
			};
		};
		
		$scope.loadExternalData = function(url){
			$http.get(url).then(function(response){
				$scope.data = response.data;
			});
		};

		this.addHeaderPattern = function(node){
			$element.find("table").prepend(node);
		};

		this.addRowPattern = function(node, filter){
			angular.element(node).find("tr").attr("ng-repeat","item in data" + filter);
			var parent = document.createElement("div");
			parent.appendChild(node);
			$element.find("table").append(parent.innerHTML);
			$compile($element.find("table"))($scope);
		};

		this.setCurrentPage = function(_currentPage){
			$scope.currentPage = _currentPage
		};


	}]);