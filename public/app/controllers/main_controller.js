(function(){
	angular
	.module('main')
	.controller('main_controller', [main_controller]);

	function main_controller() {
		var self = this;
		self.map = map;

		function map($scope, NgMap, $firebaseArray) {

			// add map to scope
			NgMap.getMap().then(function(map) {
				$scope.map = map;
			});

			// pull location data from firebase
			var ref = firebase.database().ref().child("locations");
			$scope.locations = $firebaseArray(ref);

			$scope.addMarker = function(item) {
				
				// display marker and info window
				$scope.location = item;
				$scope.map.showInfoWindow('info', 'marker');

				// dynamic map re-centering
				var coords = new google.maps.LatLng(item.coords.lat, item.coords.lng);
				$scope.map.panTo(coords);

			}
		};
	}
	
})();