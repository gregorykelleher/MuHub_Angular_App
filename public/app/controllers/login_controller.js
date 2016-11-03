(function(){
	angular
	.module('main')
	.controller('login_controller', [login_controller]);

	function login_controller() {
		var self = this;
		self.login = login;

		function login($scope, $firebaseAuth, Auth) {

			var auth = $firebaseAuth();

			$scope.register = function() {
				$scope.message = null;
				$scope.error = null;

				Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
				.then(function(firebaseUser) {
					$scope.message = "User created with uid: " + firebaseUser.uid;
				}).catch(function(error) {
					$scope.error = error;
				});
			}

			$scope.sign_in = function() {
				$scope.message = null;
				$scope.error = null;

				Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
				.then(function(firebaseUser) {
					$scope.message = "User signed in with uid: " + firebaseUser.uid;
				}).catch(function(error) {
					$scope.error = error;
				});
			}

		};
	}
	
})();