'use strict';

/**
 * @ngdoc overview
 * @name reTestApp
 * @description
 * # reTestApp
 *
 * Main module of the application.
 */
var app = angular.module('app', ['ngAnimate','ngAria','ngCookies','ngMessages','ngResource','ngRoute','ngSanitize','ngTouch', 'appFilters', 'appControllers']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/add', {
        templateUrl: 'views/deezer.html',
        controller: 'MusicCtrl'
      })
      .otherwise({
        redirectTo: '/404.html'
      });
}]);
