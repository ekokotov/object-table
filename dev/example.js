/**
*  Module
*
* gTableTest Description
*/
angular.module('test', ['objectTable'])
.controller('mainController', function($scope, $http, $timeout, $q) {

  $scope.data = [{name: 'Moroni', age: 50, money: -10},
      {name: 'Tiancum', age: 43,money: 120},
      {name: 'Jacob', age: 27, money: 5.5},
      {name: 'Nephi', age: 29,money: -54},
      {name: 'Enos', age: 34,money: 110},
      {name: 'Tiancum', age: 43, money: 1000},
      {name: 'Jacob', age: 27,money: -201},
      {name: 'Nephi', age: 29, money: 100},
      {name: 'Enos', age: 34, money: -52.5},
      {name: 'Tiancum', age: 43, money: 52.1},
      {name: 'Jacob', age: 27, money: 110},
      {name: 'Nephi', age: 29, money: -55},
      {name: 'Enos', age: 34, money: 551},
      {name: 'Tiancum', age: 43, money: -1410},
      {name: 'Jacob', age: 27, money: 410},
      {name: 'Nephi', age: 29, money: 100},
      {name: 'Enos', age: 34, money: -100}];

  $scope.test = function(e) {
    alert('Alert from controller method!');
  };

  $scope.logChange = function(oldValue, newValue) {
    console.log(oldValue);
    console.log(newValue);
  };

  $scope.dataTeacherSearch = [{'employeeNo': '4433',
 'name': {'firstName': 'kuldeep','middleName': 'dsf','lastName': 'gfdkjh'},
 'department': [{'dept': 'Computer Science','status': true},
 {'dept': 'science','status': false},
 {'dept': 'sports','status': false},
 {'dept': 'sdlkf','status': false}],
 'designation': [{'post': 'director','status': false},
 {'post': 'principal','status': false},
 {'post': 'teaching','status': true},
 {'post': 'nonteaching','status': false}]}];

  $scope.report = {
    selectedUser: null
  }

  $scope.pagingExample = {
    exData: null,
    limit: 0,
    currentPage: 0,
    total: 0,
    pages: []
  };

  var ctrl = this,
  initialLoaded = false;

  $scope.loadData = function(n) {

    //don't load if n==0 or n>pages
    if ($scope.pagingExample.pages.length) {
      if (n == 0 || n > $scope.pagingExample.pages.length) return;
    };

    //load data
    $http.get('data/data-page' + n + '.json').then(function(response) {
      $scope.pagingExample.exData = response.data.data;
      $scope.pagingExample.limit = response.data.limit;
      $scope.pagingExample.currentPage = response.data.page;
      $scope.pagingExample.total = response.data.total;

      //calculate pages just once - after first loading
      if (!initialLoaded) {
        ctrl.getTotalPages();
        initialLoaded = true;
      };
    });
  };

  // load first page
  $scope.loadData($scope.pagingExample.currentPage + 1);

  // calculate totals and return page range ([1,2,3])
  this.getTotalPages = function() {
    var count = Math.round($scope.pagingExample.total / $scope.pagingExample.limit);
    for (var i = 0; i < count; i++) {
      $scope.pagingExample.pages.push(i);
    };
  };

  $scope.getTotalBalance = function(data) {
    if (!data || !data.length) return;
    var totalNumber = 0;
    for (var i = 0; i < data.length; i++) {
      totalNumber = totalNumber + parseFloat(data[i].money);
    }

    return Math.round(totalNumber);

  };

})
