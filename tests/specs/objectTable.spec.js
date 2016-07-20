'use strict';
describe('Unit: ObjectTableController', function() {
  // Load the module with MainController
  var scope,elm, data = [{name: "Moroni", age: 50, money: -10},
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
  {name: "Enos", age: 34, money: -100}],
  fields=['age','name'],
  headers=['Age','Full Name'];

  beforeEach(module('objectTable'));

  beforeEach(
    inject(function ($rootScope, $compile) {
      elm = angular.element('<table object-table data="users" headers="' + headers.join(",") + '" fields="' + fields.join(",") + '"></table>');
      scope = $rootScope.$new();
      scope.users = data;
      scope.fields = fields;
      $rootScope.$digest();
      $compile(elm)(scope);
      scope.$digest();
    }));

  it('is compiled into table', function() {
    expect(elm.find('table').length).toBe(1);
  });

  it('found head', function() {
    expect(elm.find('thead').length).toBe(1);
  });

  it('found body', function() {
    expect(elm.find('tbody').length).toBe(1);
  });

  it('found few headers', function() {
    expect(elm.find('th').length).toBe(2);
  });

  it('found few cells', function() {
    expect(elm.find('td').length).toBeGreaterThan(1);
  });

  it('check compilled header', function() {
     expect(elm.find('thead').find('th')[0].innerText).toEqual(headers[0]);
     expect(elm.find('thead').find('th')[1].innerText).toEqual(headers[1]);
  });

  it('compare first row value with initial data', function() {
    expect(elm.find('tbody').find('td')[0].innerText).toEqual(""+scope.users[0][fields[0]]);
    expect(elm.find('tbody').find('td')[1].innerText).toEqual(""+scope.users[0][fields[1]]);
  });

  describe('ifSelected', function(){
    it('should return false if no row selected', function(){
      var isolatedScope = elm.children().scope()
      isolatedScope.selectedModel = null;
      expect(isolatedScope.ifSelected({})).toBeFalsy()
    })
  })

});