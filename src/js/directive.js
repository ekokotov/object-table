"use strict"
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
			display:"@",
			paging:"=?",
			fromUrl:"@",
			//search:"@?",
			//headers:"@",
			//fields:"@",
			sortingType: "@?sorting",
			editable:"=?",
			select:"@?"

		},
		compile:function( tElement, tAttributes) {

			//collect filters
			var rowFilter = "",
			    pagingFilter = "";

			// additional user filters 
			if(!!tAttributes.addFilter){
				rowFilter += tAttributes.addFilter;
			};

			//If SORTING allowed
			if(tAttributes.sorting!=="false"){
				rowFilter += "| orderBy:sortingArray";
			};

			//If SEARCH allowed
			if(tAttributes.search =="separate"){
				//var fields = [];
				tAttributes.fields.split(',').forEach(function(item,index){
				//fields.push( item.trim() );
				rowFilter += "| filter:{'" +item.trim()+ "':columnSearch[" +index+ "]}";
			});

				
			}else if(typeof(tAttributes.search)=='undefined' || tAttributes.search=="true"){
				rowFilter += "| filter:globalSearch";
			};

			pagingFilter = rowFilter;
			rowFilter += " | offset: currentPage:display |limitTo: display";

			tElement[0].querySelector("#rowTr").setAttribute("ng-repeat","item in data" + rowFilter);
			//add paging
			tElement.find("paging").attr("count","(data" + pagingFilter + ").length");

			return function preLink(scope, element, attrs, ctrl, transclude) {
				ctrl._init();

				transclude(scope, function(clone, innerScope) {
					scope.$owner = innerScope.$parent;
					for(var key in clone){
						if(clone.hasOwnProperty(key) && clone[key].tagName=="THEAD"){
							ctrl._addHeaderPattern(clone[key]);
						}else if(clone[key].tagName=="TBODY"){
							scope.findBody = true;
							ctrl._addRowPattern(clone[key],rowFilter);
						}
					};
				});

			}
		},

	}

}]);