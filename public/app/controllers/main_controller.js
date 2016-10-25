(function(){
	angular
	.module('main')
	.controller('main_controller', [main_controller]);

	function main_controller() {
		var self = this;
		// self.test = test;
		self.ngmap = ngmap;

		// function test($scope) {
		// 	$scope.title = "App";
		// }

		function ngmap(NgMap) {
			NgMap.getMap().then(function(map) {
				
			});
		};

	}

})();