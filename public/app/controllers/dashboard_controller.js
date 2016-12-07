(function(){
	angular
	.module('main')
	.controller('dashboard_controller', [dashboard_controller]);

	function dashboard_controller() {
		var self = this;
		self.weather = weather;
		self.map = map;
		self.chat = chat;
		self.timetable;

		function weather($scope) {

			$scope.day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()];
			// http://api.openweathermap.org/data/2.5/forecast?q=Maynooth,ie&units=metric&APPID=22d446acf6fed1e84d9fa2f7eb4a89ac"
			$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=Maynooth,ie&units=metric&APPID=b7c4cdf421b48042847185d7ace4855a").then(function(wd) {
				$scope.location = (wd.city.name).toString();
				$scope.weather = (wd.list[0].weather[0].main).toString();
				$scope.temp = (wd.list[0].main.temp).toString().split('.')[0] + "°C";

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

		function chat($scope, $firebaseArray, $firebaseObject, Data, Auth, $timeout) {

			$scope.current_user_id = Auth.$getAuth().uid;

			$scope.rooms = $firebaseArray(Data.child('users'));
			$scope.users = [];

			// remove current user from list
			$scope.rooms.$loaded()
			.then(function(){
				angular.forEach($scope.rooms, function(user, uid) {
					uid = $scope.uid;
					if (user.id != uid) {
						$scope.users.push(user);
					}
				});
			});

			var tabs = [{ title: 'Contacts', content: $scope.rooms}],
			selected = null,
			previous = null;
			$scope.tabs = tabs;
			$scope.contacts=tabs[0];
			$scope.selectedIndex = 0;

			$scope.changeTabState = function(bool) {
				$scope.tab_state = bool;
			}

			$scope.openChat = function(item) { 

				$scope.receiver = item.first_name;
				$scope.receiver_id = item.id;

				$scope.rooms = $firebaseArray(Data.child("rooms"));

				// console.log("Gregory: " + $scope.current_user_id);
				// console.log("Receiver: " + $scope.receiver_id);

				function createRoom(current_user_id, receiver_id) {

					var room_key = Data.child('rooms').push().key;


					$scope.rooms.$add({
						room_key: room_key,
						usr_1: current_user_id,
						usr_2: receiver_id
					});

					Data.child('rooms').on("child_added", function(snapshot) {
						var data = snapshot.val();
						console.log("room_key: " + data.room_key);
						console.log("usr_1: " + data.usr_1);
						console.log("usr_2: " + data.usr_2);
					});

				}

				// createRoom($scope.current_user_id, $scope.receiver_id);

				Data.child('rooms').orderByChild('usr_2').equalTo($scope.receiver_id).once('value', function(snapshot){
					snapshot.forEach(function(userSnapshot) {
						$scope.data = userSnapshot.val();
						if ($scope.data.usr_1 == $scope.current_user_id) {
							console.log("room already exists with current user and receiver user");
						}
					});
				});

				 // var query = Data.child("rooms").orderByChild("member_1").limitToLast(10);
				 // var list = $firebaseArray(query);
				 // console.log(list);


				// if (roomCheck($scope.current_user_id, $scope.receiver_id) == true) {
				// 	createRoom($scope.current_user_id, $scope.receiver_id);
				// }

				// Data.child("users").orderByChild("id").equalTo("sh09YVUPM6PDRszQyvkO6Fjzc6x2").once("value", function(snapshot) {
				// 	var userData = snapshot.val();
				// 	if (userData){
				// 		console.log("exists!");
				// 	}
				// });


				// Data.child("rooms").orderByChild("member_1").equalTo($scope.current_user_id).once("value", function(snapshot) {
				// 	var userData = snapshot.val();
				// 	if (userData){
				// 		console.log("exists!");
				// 	}
				// });

				// Data.child("rooms").once("value", function(snapshot) {
				// 	snapshot.forEach(function(childSnapshot) {
				// 		var key = childSnapshot.key();
				// 		console.log(key);
				// 		var childData = childSnapshot.val();
				// 	})
				// });


				// Data.child("rooms").orderByChild("member_1").equalTo($scope.current_user_id).once("value", function(snapshot) {
				// 	console.log(snapshot.val());
				// }, function (err) {
				// 	console.log("can't");
				// });

				// Data.child("rooms").equalTo($scope.receiver).once("value", function(snapshot) {
				// 	snapshot.forEach(function(data) {
				// 		console.log(data.val());
				// 	});
				// });
				
				// Data.child("rooms").once("value", function(snapshot) {
				// 	snapshot.forEach(function(childSnapshot) {
				// 		var childData = childSnapshot.val();
				// 		console.log(childData);
				// 	});
				// });



				// function roomCheck(current_user_id) {

				// 	console.log($firebaseArray(Data.child('users')));

				// 	Data.child('users').orderByChild("id").equalTo("current_user_id").once("value", function(snapshot) {
				// 		var userData = snapshot.val();
				// 		console.log(userData);
				// 		if (userData){
				// 			console.log("exists!");
				// 		}
				// 		else console.log("nope!");
				// 	});
				// }
				// roomCheck($scope.current_user_id);


				// dynamic user chat tab
				if ($scope.tabs.length == 1) {
					$scope.tabs.push({ title: $scope.receiver, disabled: false});
				}
				// check if tab is already open and if the tab has a different title
				else if ($scope.tabs.length == 2 && $scope.tabs[1].title != $scope.receiver) {
					$scope.tabs.splice(1);
					$scope.tabs.push({ title: $scope.receiver, disabled: false});
				}
			};

		}
	}
	
})();