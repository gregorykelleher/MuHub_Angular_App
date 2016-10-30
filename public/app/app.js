'use strict'

angular
.module('app', ['ngMaterial', 'main', 'firebase', 'ngMap', 'ngSanitize'])
.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
	.primaryPalette('teal')
});

