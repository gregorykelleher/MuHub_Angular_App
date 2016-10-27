(function(){
	angular
	.module('main')
	.controller('main_controller', [main_controller]);

	function main_controller() {
		var self = this;
		self.ngmap = ngmap;
		self.list = list;

		function ngmap(NgMap) {
			NgMap.getMap().then(function(map) {
			});
		};

		function list($scope) {

			$scope.north_campus = [
			{
				room_name: 'Iontas Lecture Theatre',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Iontas Seminar Room 0.32',
				room_code: 'IONSEM',
				building: 'Iontas'
			},
			{
				room_name: 'Test 1',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 2',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 3',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 4',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 5',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 6',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 7',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 8',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 9',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 10',
				room_code: 'IONTH',
				building: 'Iontas'
			},
			{
				room_name: 'Test 11',
				room_code: 'IONTH',
				building: 'Iontas'
			}
			];
			$scope.south_campus = [
			{
				room_name: 'Hall 5',
				room_code: 'LOGIC',
				building: 'Logic House'
			},
			{
				room_name: 'Physics Hall',
				room_code: 'PSYHAL',
				building: 'Rhetoric House'
			}
			];
		};

	}

})();