'use strict'

angular
.module('app', ['ngMaterial','ui.router', 'main', 'firebase', 'ngMap', 'ngSanitize'])

/* Angular Firebase Services */

.factory('Auth', ["$firebaseAuth", function($firebaseAuth) {return $firebaseAuth(); }])
.factory("Data", function() { return firebase.database().ref(); })

/* Toast Display Service */

.factory('toast', function($mdToast) { 
	return { display: function(message) { $mdToast.show(
		$mdToast.simple()
		.textContent(message)
		.hideDelay(3000)
		)}
}; })

.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

	/* Angular Material Theming */

	$mdThemingProvider.theme('default')
	.primaryPalette('teal')

	/* Angular Ui-Router Routing */

	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('home', {
		url: '/home',
		views: {
			'dash_toolbar': {
				templateUrl: 'app/views/dash_toolbar.html',
				controller: 'dash_toolbar_controller',
				controllerAs: 'dt'
			},
			'dashboard': {
				templateUrl: 'app/views/dashboard.html',
				controller: 'dashboard_controller',
				controllerAs: 'dc'
			}
		},
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

