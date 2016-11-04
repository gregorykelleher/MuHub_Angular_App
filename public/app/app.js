'use strict'

angular
.module('app', ['ngMaterial','ui.router', 'main', 'firebase', 'ngMap', 'ngSanitize'])

.factory('Auth', ["$firebaseAuth", function($firebaseAuth) {return $firebaseAuth(); }])
.factory("Data", function() { return firebase.database().ref(); })

.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

	$mdThemingProvider.theme('default')
	.primaryPalette('teal')

	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'app/views/dashboard.html',
		controller: 'map_controller',
		controllerAs: 'mp',
		resolve: {
			currentAuth: ['Auth', function(Auth) {
				return Auth.$requireSignIn()
			}]
		},
	})
	.state('login', {
		url: '/login',
		templateUrl: 'app/views/login.html',
		controller: 'login_controller',
		controllerAs: 'lg'
	})
});

