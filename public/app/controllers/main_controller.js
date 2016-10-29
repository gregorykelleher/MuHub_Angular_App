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

			$scope.$watch('topIndex', angular.bind(this, function(topIndex) {
				if($scope.locations[topIndex].campus == "north") {
					$scope.subheader = "North Campus"
				}
				else if($scope.locations[topIndex].campus == "south") {
					$scope.subheader = "South Campus"
				}
			}));

			$scope.locations = [
			{
				room_name: 'Iontas Lecture Theatre',
				room_code: 'IONTH',
				building: 'Iontas',
				campus: 'north'
			},
			{
				room_name: 'Iontas Seminar Room 0.32',
				room_code: 'IONSEM',
				building: 'Iontas',
				campus: 'north'
			},
			{
				room_name: 'John Hume Lecture 1',
				room_code: 'JH1',
				building: 'John Hume Building',
				campus: 'north'
			},
			{
				room_name: 'John Hume Lecture 2',
				room_code: 'JH2',
				building: 'John Hume Building',
				campus: 'north'
			},
			{
				room_name: 'John Hume Lecture 3',
				room_code: 'JH3',
				building: 'John Hume Building',
				campus: 'north'
			},
			{
				room_name: 'John Hume Lecture 4',
				room_code: 'JH4',
				building: 'John Hume Building',
				campus: 'north'
			},
			{
				room_name: 'John Hume Lecture 5',
				room_code: 'JH5',
				building: 'John Hume Building',
				campus: 'north'
			},
			{
				room_name: 'John Hume Lecture 6',
				room_code: 'JH6',
				building: 'John Hume Building',
				campus: 'north'
			},
			{
				room_name: 'Maths Hall',
				room_code: 'MAH',
				building: 'Logic House',
				campus: 'south'
			},
			{
				room_name: 'Room 2.21 First Floor',
				room_code: 'RH2.21',
				building: 'Rowan House',
				campus: 'south'
			},
			{
				room_name: 'Geography Roque Lab',
				room_code: 'GR',
				building: 'Rhetoric House',
				campus: 'south'
			},
			{
				room_name: 'Physics Hall',
				room_code: 'PH',
				building: 'Long Corridor',
				campus: 'south'
			},
			{
				room_name: 'Callan Hall',
				room_code: 'CH',
				building: 'Long Corridor',
				campus: 'south'
			}
			];
			$scope.somewhere = [
			{
				room_name: 'Chocolate',
				room_code: 'Rabbit',
				building: 'Cabbage',
				campus: 'Banana'
			}
			];
		};

	}

})();