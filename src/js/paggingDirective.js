angular.module('objectTable').directive('pagging', ['$compile','$interpolate',function ($compile,$interpolate) {
	return {
		restrict: 'E',
		replace:true,
		templateUrl: 'templates/pagging.html',
		controller:'paggingTableCtrl',
		require:"^objectTable",
		scope:{
			count:"=",
			display:"="
		},
		link:function(scope, element, attrs, objectTableCtrl){
			scope.objectTableCtrl = objectTableCtrl;
		}
	}
}]);