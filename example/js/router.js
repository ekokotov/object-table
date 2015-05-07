angular.module('test').config(function ($routeProvider) {
       $routeProvider.when('/:template', {
            controller:'mainController',
            templateUrl:function(params){
                return !!params.template ? 'example/partials/'+ params.template + '.html' : "example/partials/basic.html";
            }
        }).when('/',{
             controller:'mainController',
            templateUrl:"example/partials/basic.html"
        });
    });