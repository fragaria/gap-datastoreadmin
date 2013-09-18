'use strict';


// Declare app level module which depends on filters, and services
angular.module('datastoreadmin', [
        'ngRoute',
        'ngResource',
        'datastoreadmin.controllers',
    ]).
    config([
        '$routeProvider',
        '$locationProvider',
        function ($routeProvider, $locationProvider) {
            var partialsRootUrl = '/static/datastoreadmin/partials/';

            $locationProvider.html5Mode(false).hashPrefix('');

            $routeProvider.when('/', {
                templateUrl: partialsRootUrl + 'home.html'
            });
            $routeProvider.when('/:model/list', {
                templateUrl: partialsRootUrl + 'list.html',
                controller: 'ListController'
            });
            $routeProvider.otherwise({redirectTo: '/'});
    }]).
    value('AppSettings', {
        resources: {
            apiUrl: 'http://localhost:8080/resources\\/',
        }
    }).
    run([
        '$rootScope',
        '$routeParams',
        '$location',
        '$log',
        '$anchorScroll',
        function ($rootScope, $routeParams, $location, $log, $anchorScroll) {

            $rootScope.isLoading = false;

            $rootScope.$safeApply = function($scope, fn) {
                $scope = $scope || $rootScope;
                fn = fn || function() {};

                if ($scope.$$phase) {
                    fn();
                } else {
                    $scope.$apply(fn);
                }
            };

            /**
             * Easy access to route params
             */
            $rootScope.params = $routeParams;
            /**
             * Wrapper for angular.isArray, isObject, etc checks for use in the view
             *
             * @param type {string} the name of the check (casing sensitive)
             * @param value {string} value to check
             */
            $rootScope.is = function (type, value) {
                return angular['is' + type](value);
            };
            /**
             * Wrapper for $.isEmptyObject()
             *
             * @param value	{mixed} Value to be tested
             * @return boolean
             */
            $rootScope.empty = function (value) {
                return $.isEmptyObject(value);
            };
            /**
             * Debugging Tools
             *
             * Allows you to execute debug functions from the view
             */
            $rootScope.log = function(variable) {
                console.log(variable);
            };
            $rootScope.alert = function(text) {
                alert(text);
            };
            /**
             * Utility function to go back when needed.
             */
            $rootScope.back = function () {
                history.back();
            };

            $rootScope.home = function () {
                $location.path('/');
            };

            $rootScope.goTo = function (path) {
                $location.url(path);
            };

            $rootScope.$on('$errorLoading', function (event) {
                $location.path('/error');
            });

            $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
                $log.error("ROUTE CHANGE ERROR!", rejection);
            });

            $rootScope.$on('$routeChangeStart', function () {
                $log.info('Page loading: starts');
            });

            $rootScope.$on('$routeChangeSuccess', function () {
                $log.info('Page loading: done');
                $location.hash($routeParams.scrollTo);
                return $anchorScroll();
            });
        }
    ]);
