/**
*  Module
*
* gTableTest Description
*/
angular.module('test')
.controller('serverPagingController', function ($scope, $http,$timeout) {


/* ### Simple server paging ### */
	$scope.simplePaging = {
		data:null,
		display:0,
		currentPage:0,
		total:0,
		pages:0
	};

	$scope.loadSimpleData = function(n){

		//don't load if n==0 or n>pages
		if($scope.simplePaging.pages){
			if(n==0 || n > $scope.simplePaging.pages) return;
		};

    	//load data 
	    $http.get('test-data/data-page'+ n +'.json').then(function(response){
	    	$scope.simplePaging.data = response.data.data;
	    	$scope.simplePaging.display = response.data.limit;
	    	$scope.simplePaging.currentPage = response.data.page;
	    	$scope.simplePaging.total = response.data.total;

	    	//calculate page count
	    	if(!$scope.simplePaging.pages){
	    		$scope.simplePaging.pages = Math.round(response.data.total / response.data.limit);
	    	};
	    		
	    });
    
	};

	// load first page
	$scope.loadSimpleData(1);

/* [END] Simple server paging ### */


/* ### Advanced server paging ### */
$scope.advPaging = {
	data:null,
	display:0,
	currentPage:0,
	total:0,
	pages:[]
};

var ctrl = this;

$scope.loadData = function(n){

    //don't load if n==0 or n>pages
    if($scope.advPaging.pages.length){
    	if(n==0 || n > $scope.advPaging.pages.length) return;
    };
    
	//load data ($timeout to emulate delay)
	$scope.advPaging.data=[];
	$timeout(function(){
		$http.get('test-data/data-page'+ n +'.json').then(function(response){
		   	$scope.advPaging.data = response.data.data;
		   	$scope.advPaging.display = response.data.limit;
		   	$scope.advPaging.currentPage = response.data.page;
		   	$scope.advPaging.total = response.data.total;

	        //calculate pages just once - after first loading
	        if(!$scope.advPaging.pages.length){
	        	ctrl.getTotalPages();
	        };
		});
	},2000);
   
};

// load first page
$scope.loadData(1);

// calculate totals and return page range ([1,2,3])
this.getTotalPages = function(){
	var count = Math.round($scope.advPaging.total / $scope.advPaging.display);
	for (var i = 0; i < count; i++) {
		$scope.advPaging.pages.push(i);
	};
};

/* [END] Advanced server paging ### */


/*codemirror*/
$scope.editorOptions = {
	lineNumbers: true,
	readOnly: 'nocursor'
};

$scope.editorOptionsJS = {
	lineNumbers: true,
	readOnly: 'nocursor',
	mode:"javascript"
};


});