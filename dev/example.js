/**
*  Module
*
* gTableTest Description
*/
angular.module('test', ['objectTable'])
.controller('mainController', function ($scope,$http,$timeout,$q) {

    $scope.fields = ['age','name'];
	$scope.data = [{name: "Moroni", age: 50, money: -10},
    {name: "Tiancum", age: 43,money: 120},
    {name: "Jacob", age: 27, money: 5.5},
    {name: "Nephi", age: 29,money: -54},
    {name: "Enos", age: 34,money: 110},
    {name: "Tiancum", age: 43, money: 1000},
    {name: "Jacob", age: 27,money: -201},
    {name: "Nephi", age: 29, money: 100},
    {name: "Enos", age: 34, money: -52.5},
    {name: "Tiancum", age: 43, money: 52.1},
    {name: "Jacob", age: 27, money: 110},
    {name: "Nephi", age: 29, money: -55},
    {name: "Enos", age: 34, money: 551},
    {name: "Tiancum", age: 43, money: -1410},
    {name: "Jacob", age: 27, money: 410},
    {name: "Nephi", age: 29, money: 100},
    {name: "Enos", age: 34, money: -100}];

    $scope.test = function(e) {
      alert('Alert from controller method!');
  };

  $scope.report = {
    selectedUser:null
}

/* Simple server paging */
$scope.simplePagingExample = {
    exData:null,
    limit:0,
    currentPage:0,
    total:0,
    pages:0
};
$scope.loadSimpleData = function(n){
   
      //don't load if n==0 or n>pages
      if($scope.simplePagingExample.pages){
        if(n==0 || n > $scope.simplePagingExample.pages) return;
    };
    //load data
    $scope.simplePagingExample.exData = [];
    $timeout(function(){
     $http.get('data/data-page'+ n +'.json').then(function(response){
        $scope.simplePagingExample.exData = response.data.data;
        $scope.simplePagingExample.limit = response.data.limit;
        $scope.simplePagingExample.currentPage = response.data.page;
        $scope.simplePagingExample.total = response.data.total;
        if(!$scope.simplePagingExample.pages)
            $scope.simplePagingExample.pages = Math.round($scope.simplePagingExample.total / $scope.simplePagingExample.limit);
    });
 },1000);
    
};
// load first page
$scope.loadSimpleData(1);

/* Advanced server paging */
$scope.pagingExample = {
    exData:null,
    limit:0,
    currentPage:0,
    total:0,
    pages:[]
};

var ctrl = this;


$scope.loadData = function(n){

    //don't load if n==0 or n>pages
    if($scope.pagingExample.pages.length){
        if(n==0 || n > $scope.pagingExample.pages.length) return;
    };
    
    //load data
    $http.get('data/data-page'+ n +'.json').then(function(response){
        $scope.pagingExample.exData = response.data.data;
        $scope.pagingExample.limit = response.data.limit;
        $scope.pagingExample.currentPage = response.data.page;
        $scope.pagingExample.total = response.data.total;

        //calculate pages just once - after first loading
        if(!$scope.pagingExample.pages.length){
            ctrl.getTotalPages();
        };
    });
};

// load first page
$scope.loadData(1);

// calculate totals and return page range ([1,2,3])
this.getTotalPages = function(){
    var count = Math.round($scope.pagingExample.total / $scope.pagingExample.limit);
    for (var i = 0; i < count; i++) {
        $scope.pagingExample.pages.push(i);
    };
};



$scope.getTotalBalance = function(data){
    if(!data || !data.length) return;
    var totalNumber = 0;
    for(var i=0; i<data.length; i++){
      totalNumber = totalNumber + parseFloat(data[i].money);
  }

  return Math.round(totalNumber);
  
};



})