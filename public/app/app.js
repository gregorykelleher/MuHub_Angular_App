'use strict'

angular.module('cs353_project', ['ngMaterial', 'firebase'])
.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
	.primaryPalette('teal')
});

