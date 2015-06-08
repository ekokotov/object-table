/**
*  Module
*
* gTableTest Description
*/
angular.module('test', ['objectTable','ngRoute','ui.codemirror'])
.controller('mainController', function ($scope, $routeParams,$location,$timeout) {

  $scope.state = $routeParams.template;

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

  $scope.report = {
    selectedPerson:null
  };

  $scope.test = function(e) {
    alert('Alert from controller method!');
  };
  
  $scope.showItem = function(item) {
    alert(JSON.stringify(item));
  };

   $scope.getTotalBalance = function(data){
    //return if empty or not ready
    if(!data || !data.length) return;

    var totalNumber = 0;
    for(var i=0; i<data.length; i++){
      totalNumber = totalNumber + parseFloat(data[i].money);
    }

    return Math.round(totalNumber);
  
  };

  // this variable will contains all data after loading
  $scope.dataFromUrl =[];

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



})