"use strict"
angular.module('objectTable',[]).directive('objectTable', ['$compile','$interpolate',function ($compile,$interpolate) {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'templates/common.html',
		controller:'objectTableCtrl',
		controllerAs:"ctrl",
		transclude: true,
		scope:{
			data:"=",
			display:"@",
			//search:"@"
			//pagging:"@"
			//fromUrl:"@",
			//headers:"@",
			//fields:"@",
			sortingType: "@sorting"

		},
		compile:function( tElement, tAttributes) {

			//collect filters
			var rowFilter = "",
			    paggingFilter = "";

			// additional user filters 
			if(!!tAttributes.addFilter){
				rowFilter += tAttributes.addFilter;
			};

			//If SORTING allowed
			if(tAttributes.sorting!=="false"){
				rowFilter += "| orderBy:sortingArray";
			};

			//If SEARCH allowed
			if(typeof(tAttributes.search)=='undefined' || Boolean.valueOf(tAttributes.search)()){
				rowFilter += "| filter:globalSearch";
			};

			paggingFilter = rowFilter;
			rowFilter += " | offset: currentPage:display |limitTo: display";

			tElement[0].querySelector("#rowTr").setAttribute("ng-repeat","item in data" + rowFilter);
			//add pagging
			tElement.find("pagging").attr("count","(data" + paggingFilter + ").length");

			return function preLink(scope, element, attrs, ctrl, transclude) {
				ctrl.init();

				transclude(scope, function(clone, innerScope) {
					scope.$owner = innerScope.$parent;
					for(var key in clone){
						if(clone.hasOwnProperty(key) && clone[key].tagName=="THEAD"){
							ctrl.addHeaderPattern(clone[key]);
						}else if(clone[key].tagName=="TBODY"){
							scope.findBody = true;
							ctrl.addRowPattern(clone[key],rowFilter);
						}
					};
				});

			}
		},

	}

}]).filter('offset', function() {
	return function(input, start, display) {
		if (!input) return;
		start = parseInt(start, 10);
            //if (start == 1) return input.slice(0, display);
            display = parseInt(display, 10);
            var offset = start* display;
            return input.slice(offset, offset + display);
        };
    })