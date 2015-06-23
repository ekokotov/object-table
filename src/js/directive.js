	"use strict";
	angular.module('objectTable').directive('objectTable', ['$compile','$interpolate',function ($compile,$interpolate) {
		return {
			restrict: 'A',
			replace:true,
			templateUrl: '/src/templates/common.html',
			controller:'objectTableCtrl',
			controllerAs:"ctrl",
			transclude: true,
			scope:{
				data:"=",
				display:"=?",
				resize:"=?",
				paging:"=?",
				fromUrl:"@",
			//search:"@?",
			//headers:"@",
			//fields:"@",
			sortingType: "@?sorting",
			editable:"=?",
			select:"@?",
			selectedModel:"=?"

		},
		compile:function( tElement, tAttributes) {

			//collect filters
			var rowFilter = "", pagingFilter = "";

			// additional user filters 
			if(!!tAttributes.addFilter){
				rowFilter += tAttributes.addFilter;
			}

			//If SORTING allowed
			if(tAttributes.sorting!=="false"){
				rowFilter += "| orderBy:sortingArray";
			}

			//If SEARCH allowed
			if(tAttributes.search =="separate"){
				tAttributes.fields.split(',').forEach(function(item,index){
					rowFilter += "| filter:{'" +item.trim()+ "':columnSearch[" +index+ "]}";
				});
			}else if(typeof(tAttributes.search)=='undefined' || tAttributes.search==="true"){
				rowFilter += "| filter:globalSearch";
			}

			pagingFilter += " | offset: currentPage:display |limitTo: display";

			tElement[0].querySelector("#rowTr").setAttribute("ng-repeat","item in $parent.$filtered = (data" + rowFilter +")"+ pagingFilter);

			return function preLink(scope, element, attrs, ctrl, transclude) {
				ctrl._init();
				transclude(scope, function(clone, innerScope) {
					scope.$owner = innerScope.$parent;
					for(var key in clone){
						if(clone.hasOwnProperty(key)){
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