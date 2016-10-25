'use strict'

angular
.module('app', ['ngMaterial', 'main', 'firebase', 'ngMap'])
.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
	.primaryPalette('teal')
});

