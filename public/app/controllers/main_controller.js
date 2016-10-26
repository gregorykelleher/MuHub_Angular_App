(function(){
	angular
	.module('main')
	.controller('main_controller', [main_controller]);

	function main_controller() {
		var self = this;
		self.ngmap = ngmap;
		self.list = list;
		self.test = test;

		function ngmap(NgMap) {
			NgMap.getMap().then(function(map) {
			});
		};

		function test($scope) {
			$scope.greetings = [
			{
				word: 'hello'
			}
			];
		};

		function list($scope) {
			$scope.locations = [
			{
				room_name: 'Iontas Lecture Theatre',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Iontas Seminar Room 0.32',
				room_code: 'IONSEM',
				building: 'Iontas'
			}
			];
		};

	}

})();