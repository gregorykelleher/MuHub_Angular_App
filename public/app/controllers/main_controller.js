(function(){
	angular
	.module('main')
	.controller('main_controller', [main_controller]);

	function main_controller() {
		var self = this;
		self.test = test;

		function test($scope) {
			$scope.title = "App";
		}

	}

})();