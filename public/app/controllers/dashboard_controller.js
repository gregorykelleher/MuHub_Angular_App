(function(){
	angular
	.module('main')
	.controller('dashboard_controller', [dashboard_controller]);

	function dashboard_controller() {
		var self = this;
		self.weather = weather;
		self.map = map;
		self.messaging = messaging;

		/* Weather Display Function */

		function weather($scope) {

			$scope.day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()];

			$.getJSON("https://api.apixu.com/v1/current.json?key=c79b2673ab674949b21164927161312&q=Maynooth").then(function(wd) {
				$scope.location = (wd.location.name);
				$scope.weather = (wd.current.condition.code).toString();
				$scope.temp = (wd.current.temp_c).toString().split('.')[0] + "°C";

				function getWeather(code) {
					var img;
					function isClear() {
						return img = "/app/imgs/clear.svg";
					}
					function isClouds() {
						return img = "/app/imgs/clouds.svg";
					}
					function isRain() {
						return img = "/app/imgs/rain.svg";
					}
					function isSnow() {
						return img = "/app/imgs/snow.svg";
					}
					function isThunder() {
						return img = "/app/imgs/thunderstorm.svg";
					}
					var codes = {
						// clear
						'1000': isClear,
						// clouds
						'1003': isClouds, '1006': isClouds, '1009': isClouds,
						// rain
						'1063': isRain, '1150': isRain, '1153': isRain, '1180': isRain, '1183': isRain, '1186': isRain, 
						'1189': isRain, '1192': isRain, '1195': isRain, '1240': isRain, '1243': isRain, '1246': isRain, 
						// snow
						'1066': isSnow, '1069': isSnow, '1114': isSnow,
						// thunderstorm
						'1087': isThunder, '1276': isThunder
					};
					return codes[code]();
				}
				$scope.img = getWeather($scope.weather);
			});
		};

		/* Map Display Function */

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

		/* Messaging Display Function */

		function messaging($scope, $firebaseArray, $firebaseObject, $timeout, Data, Auth) {

			$scope.current_user_id = Auth.$getAuth().uid;

			var room_list = $firebaseArray(Data.child('users'));
			$scope.users = [];

			// remove current user from list; for display purposes only
			room_list.$loaded()
			.then(function(){
				angular.forEach(room_list, function(user, uid) {
					uid = $scope.current_user_id;
					if (user.id != uid) {
						$scope.users.push(user);
					}
				});
			});

			// set up tab configurations
			var tabs = [{ title: 'Contacts', content: $scope.users}];
			selected = null,
			previous = null;
			$scope.tabs = tabs;
			$scope.contacts=tabs[0];
			$scope.tab_state = false;

			// change tab state for ng-show in DOM
			$scope.changeTabState = function(bool) { $scope.tab_state = bool; }

			$scope.openMessaging = function(item) { 

				//capture recipient when message tab opened
				$scope.recipient = item.first_name + " " + item.last_name;
				$scope.recipient_id = item.id;

				// create rooms node in firebase
				var rooms = $firebaseArray(Data.child("rooms"));
				
				// check whether room previously created; if not, create
				rooms.$loaded().then(function(){
					var bool = false;
					Data.child('rooms').once('value', function(snapshot) {
						snapshot.forEach(function(itemSnapshot) {
							var data = itemSnapshot.val();
							// FALSE IFF (current user OR recipient) is (initiator OR recipient)
							if (($scope.current_user_id == data.initiator && $scope.recipient_id == data.recipient)) { 
								bool = true;
							}
							else if (($scope.recipient_id == data.initiator) && ($scope.current_user_id == data.recipient)) {
								bool = true;
							}
						});
						// add room to firebase if conditions satisfied
						if (!bool) {
							rooms.$add({
								initiator: $scope.current_user_id,
								recipient: $scope.recipient_id
							});
						}
					});
				}).catch(function(error) {
					console.error("Error:", error);
				});	

				function sendMessage(message) {

					// create room_metadata in firebase
					var room_metadata = $firebaseArray(Data.child("room_metadata"));

					room_metadata.$loaded().then(function(){

						Data.child('users').child($scope.current_user_id).once('value', function(snap) {
							$scope.current_user_name = snap.val().first_name + " " + snap.val().last_name;

							Data.once('value', function() {
								room_metadata.$add({
									sender: $scope.current_user_name,
									receiver: $scope.recipient,
									message: message
								}).then(function(ref) {
									// push latest message to message_objs
									$scope.message_objs.push({message :message, sender: $scope.current_user_name});
								})
							});
						});

					}).catch(function(error) {
						console.error("Error:", error);
					});	

				}

				$scope.message = { text: null };

				// validation done in DOM - submit() posts message to firebase & clears input
				$scope.submit = function(form) {
					if ($scope.message.text) {

						sendMessage($scope.message.text);

						$scope.message.text = '';
						form.$setPristine();
						form.$setUntouched();
					}
				};

				var messages = $firebaseObject(Data.child('room_metadata'));
				$scope.message_objs = [];

				messages.$loaded()
				.then(function() {
					Data.child('users').child($scope.current_user_id).once('value', function(item) {
						$scope.current_user_name = item.val().first_name + " " + item.val().last_name;

						// only display messages with current_user and recipient members
						Data.child('room_metadata').once('value', function(data) {
							data.forEach(function(itemSnapshot) {
								if (($scope.current_user_name == itemSnapshot.val().sender) && ($scope.recipient == itemSnapshot.val().receiver)) {
									$scope.message_objs.push({message :itemSnapshot.val().message, sender: itemSnapshot.val().sender});
								}
								else if (($scope.recipient === itemSnapshot.val().sender) && ($scope.current_user_name === itemSnapshot.val().receiver)) {
									$scope.message_objs.push({message :itemSnapshot.val().message, sender: itemSnapshot.val().sender});
								}
							});

						}).catch(function(error) {
							console.error("Error:", error);
						});	
					});
				});
				
				// dynamic user chat tab
				if ($scope.tabs.length == 1) {
					$scope.tabs.push({ title: $scope.recipient, content: $scope.message_objs, disabled: false});
				}
				// check if tab is already open and if the tab has a different title
				else if ($scope.tabs.length == 2 && $scope.tabs[1].title != $scope.recipient) {
					$scope.tabs.splice(1);
					$scope.tabs.push({ title: $scope.recipient, content: $scope.message_objs, disabled: false});
				}
			};

		}
	}
	
})();