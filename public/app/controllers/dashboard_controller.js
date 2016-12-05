(function(){
	angular
	.module('main')
	.controller('dashboard_controller', [dashboard_controller]);

	function dashboard_controller() {
		var self = this;
		self.weather = weather;
		self.map = map;
		self.chat = chat;

		function weather($scope) {

			$scope.day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()];
			// http://api.openweathermap.org/data/2.5/forecast?q=Maynooth,ie&units=metric&APPID=22d446acf6fed1e84d9fa2f7eb4a89ac"
			$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=Maynooth,ie&units=metric&APPID=b7c4cdf421b48042847185d7ace4855a").then(function(wd) {
				$scope.location = (wd.city.name).toString();
				$scope.weather = (wd.list[0].weather[0].main).toString();
				$scope.temp = (wd.list[0].main.temp).toString() + "°C";


				switch ($scope.weather) {
					case "Rain":
					$scope.img = "/app/imgs/rain.svg";
					break;
					case "Drizzle":
					$scope.img = "/app/imgs/rain.svg";
					break;
					case "Clouds":
					$scope.img = "/app/imgs/clouds.svg";
					break;
					case "Clear":
					$scope.img = "/app/imgs/clear.svg";
					break;
					case "Snow":
					$scope.img = "/app/imgs/snow.svg";
					break;
					case "Thunderstorm":
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

		function chat($scope, $firebaseArray, Data, Auth, $timeout) {

			$scope.rooms = $firebaseArray(Data.child('users'));

			var tabs = [{ title: 'Contacts', content: $scope.rooms}],
			selected = null,
			previous = null;
			$scope.tabs = tabs;
			$scope.contacts=tabs[0];
			$scope.selectedIndex = 0;

			$scope.tab_state = false;

			$scope.openChat = function(item) { 

				$scope.receiver = item.first_name;
				$scope.receiver_id = item.id;

				// dynamic user chat tab
				if ($scope.tabs.length == 1) {
					$scope.tabs.push({ title: $scope.receiver, disabled: false});
				}
				else if ($scope.tabs.length == 2 && $scope.tabs[1].title != $scope.receiver) {
					$scope.tabs.splice(1);
					$scope.tabs.push({ title: $scope.receiver, disabled: false});
				}
				$scope.tab_state = true;
			};

		}
	}
	
})();