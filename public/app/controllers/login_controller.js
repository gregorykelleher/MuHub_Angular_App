(function(){
	angular
	.module('main')
	.controller('login_controller', [login_controller]);

	function login_controller() {
		var self = this;
		self.login = login;

		function login($scope, $firebaseAuth, Auth, $mdToast) {

			var auth = $firebaseAuth();

			function toast(message) {
				$mdToast.show(
					$mdToast.simple()
					.textContent(message)
					.hideDelay(3000)
					);
			}

			$scope.register = function() {
				$scope.message = null;
				$scope.error = null;

				var substring = "@mumail.ie";
				var email = $scope.email;

				function check_email(email) {
					if(email == null) { 
						return false; 
					}
					if(email.indexOf(substring) !== -1) {
						return true;
					} 
					else return false;
				}

				if(check_email(email) == true) {
					Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
					.then(function(firebaseUser) {
						$scope.message = "User created with uid: " + firebaseUser.uid;
						toast($scope.message);
					}).catch(function(error) {
						$scope.error = error.message;
							toast($scope.error);
					});
				}
				else if(check_email(email) == false) {
					toast("Not a valid '@mumail' account");
				}
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