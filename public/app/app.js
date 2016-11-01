'use strict'

angular
.module('app', ['ngMaterial','ui.router', 'main', 'firebase', 'ngMap', 'ngSanitize'])
.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

	$mdThemingProvider.theme('default')
	.primaryPalette('teal')

	$urlRouterProvider.otherwise('/main');

	$stateProvider
	.state('main', {
		url: '/home',
		templateUrl: 'app/views/main.html',
		controller: 'main_controller',
		controllerAs: 'mc'
	})
});

