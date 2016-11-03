'use strict'

angular
.module('app', ['ngMaterial','ui.router', 'main', 'firebase', 'ngMap', 'ngSanitize'])
.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

	$mdThemingProvider.theme('default')
	.primaryPalette('teal')

	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('main', {
		url: '/home',
		templateUrl: 'app/views/dashboard.html',
		controller: 'map_controller',
		controllerAs: 'mp'
	})
	.state('login', {
		url: '/login',
		templateUrl: 'app/views/login.html',
		controller: 'login_controller',
		controllerAs: 'lg'
	})
});

