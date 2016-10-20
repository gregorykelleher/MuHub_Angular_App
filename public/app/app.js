'use strict'

angular
.module('app', ['ngMaterial', 'main', 'firebase'])
.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
	.primaryPalette('teal')
});

