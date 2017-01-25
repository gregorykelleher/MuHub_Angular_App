(function(){
	angular
	.module('main')
	.controller('dash_toolbar_controller', [dash_toolbar_controller]);

	function dash_toolbar_controller() {
		var self = this;
		self.toolbar = toolbar;

		function toolbar($scope, Data, Auth, toast, $firebaseObject, $timeout, $state) {

			$scope.title = "Maynooth Student Hub";

			// get user from currentUser uid
			var uid = Auth.$getAuth().uid;
			var user = $firebaseObject(Data.child('users').child(uid));

			// pull user's name from firebase
			Data.child('users').child(uid).once('value', function(snap) {
				$timeout(function() {
					var item = snap.val();
					(item == null || undefined) ? ($scope.name = "Guest") : ($scope.name = item.first_name + " " + item.last_name);
				});
			});

			//logout user on btn
			$scope.logout = function() {
				firebase.auth().signOut().then(function() {
					$state.go('login');
					toast.display("You've been logged out")
				}, function(error) {
					toast.display("Your log out was attempted", error);
				});
			};
			
		};
	}
})();