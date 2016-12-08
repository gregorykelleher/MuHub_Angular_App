(function(){
	angular
	.module('main')
	.controller('dashboard_controller', [dashboard_controller]);

	function dashboard_controller() {
		var self = this;
		self.weather = weather;
		self.map = map;

		function weather($scope) {

			$scope.day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()];

			$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20561669%20and%20u%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys").then(function(wd) {
				$scope.location = "Maynooth";
				$scope.weather = (wd.query.results.channel.item.condition.code).toString();
				$scope.temp = (wd.query.results.channel.item.condition.temp).toString().split('.')[0] + "°C";

				switch ($scope.weather) {
					case "10":
					case "11":
					case "12":
					$scope.img = "/app/imgs/rain.svg";
					break;
					case "8":
					case "9":
					$scope.img = "/app/imgs/rain.svg";
					break;
					case "26":
					case "27":
					case "28":
					case "29":
					case "30":
					case "20":
					$scope.img = "/app/imgs/clouds.svg";
					break;
					case "31":
					case "32":
					case "33":
					case "34":
					case "36":
					case "27":
					$scope.img = "/app/imgs/clear.svg";
					break;
					case "5":
					case "6":
					case "7":
					case "13":
					case "14":
					case "15":
					case "16":
					case "17":
					case "41":
					case "42":
					case "43":
					case "46":
					$scope.img = "/app/imgs/snow.svg";
					break;
					case "3":
					case "4":
					case "37":
					case "38":
					case "39":
					case "40":
					$scope.img = "/app/imgs/thunderstorm.svg";
					break;
					default:
					$scope.img = "/app/imgs/error.svg";
				}
			});
		};

		function map($scope, NgMap, $firebaseArray, Data) {

			// add map to scope
			NgMap.getMap().then(function(map) {
				$scope.map = map;
			});

			// pull location data from firebase
			$scope.locations = $firebaseArray(Data.child('locations'));

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