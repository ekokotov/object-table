angular.module('objectTable').directive('paging', ['$compile','$interpolate',function ($compile,$interpolate) {
	return {
		restrict: 'E',
		replace:true,
		templateUrl: '/src/templates/paging.html',
		controller:'pagingTableCtrl',
		require:"^objectTable",
		scope:{
			count:"=",
			display:"="
		},
		link:function(scope, element, attrs, objectTableCtrl){
			scope.objectTableCtrl = objectTableCtrl;
			scope.objectTableCtrl.pageCtrl = scope;
		}
	};
}]);