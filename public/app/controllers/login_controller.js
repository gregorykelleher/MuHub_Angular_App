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

				function check_email(substring) {
					if(substring == null) { 
						return false; 
					}
					else if(substring.indexOf(substring) !== -1) {
						return true;
					} 
					else return false;
				}

				if(check_email(substring) == true) {
					Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
					.then(function(firebaseUser) {
						toast($scope.message);
					}).catch(function(error) {
						toast(error.message);
					});
				}
				else if(check_email(substring) == false) {
					toast("Not a valid '@mumail' account");
				}
			}

			$scope.sign_in = function() {
				$scope.message = null;
				$scope.error = null;

				Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
				.then(function(firebaseUser) {
					toast($scope.message);
				}).catch(function(error) {
					toast($scope.error);
				});
			}

		};
	}
	
})();