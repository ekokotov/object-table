angular.module('test').config(function ($routeProvider) {
       $routeProvider.when('/server-paging',{
             controller:'serverPagingController',
            templateUrl:"partials/server_paging.html"
        }).when('/:template', {
            controller:'mainController',
            templateUrl:function(params){
                return !!params.template ? 'partials/'+ params.template + '.html' : "partials/basic.html";
            }
        }).when('/',{
             controller:'mainController',
            templateUrl:"partials/basic.html"
        });
    });