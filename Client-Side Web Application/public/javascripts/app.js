/*This module is a container for the different parts of my app (controllers, directives, services)
  The reference to myFirstApp module can be found in master.html (<html ng-app='myFirstApp'>)
  The array is the list of modules myFirstApp depends on
*/
var myFirstApp = angular.module('myFirstApp', ['ngMaterial', 'ngSanitize', 'ngAnimate', 'satellizer', 'ngResource', 'ui.router', 'ngMessages', 'angular-loading-bar']).
config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$locationProvider', '$mdThemingProvider', 'cfpLoadingBarProvider',  function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider, $mdThemingProvider, cfpLoadingBarProvider) {

  $mdThemingProvider.theme('docs-dark')
      .accentPalette('red')
      .primaryPalette('indigo');

  cfpLoadingBarProvider.includeSpinner = false;
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/static/views/main.html',
      controller: 'IndexCtrl'
    }).
  state('signin', {
    url: '/signin',
    templateUrl: '/static/views/signin.html',
    controller: 'SignInCtrl',
    resolve: {
      authenticated: function($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          $location.path('/');
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      }
    }
  }).
  state('signup', {
    url: '/signup',
    templateUrl: '/static/views/signup.html',
    controller: 'SignUpCtrl',
    resolve: {
      authenticated: function($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          $location.path('/');
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      }
    }
  }).
  state('games', {
    url: '/games',
    templateUrl: '/static/views/games.html',
    controller: 'GamesCtrl',
    resolve: {
      authenticated: function($q, $location, $auth) {
        var deferred = $q.defer();
        if (!$auth.isAuthenticated()) {
          $location.path('/');
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      }
    }
  }).
 
  state('users', {
    url: '/users',
    templateUrl: '/static/views/users.html',
    controller: 'UsersCtrl',
    resolve: {
      authenticated: function($q, $location, $auth) {
        var deferred = $q.defer();
        if (!$auth.isAuthenticated()) {
          $location.path('/');
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      }
    }
  }).
  state('error', {
    url: '/error',
    templateUrl: '/static/views/error.html'
  });

  $urlRouterProvider.otherwise('/error');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);
