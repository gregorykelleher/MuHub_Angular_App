(function(){
	angular
	.module('main')
	.controller('login_controller', [login_controller]);

	function login_controller() {
		var self = this;
		self.login = login;

		function login($scope, Auth, Data, $mdToast, $state) {

			function toast(message) {
				$mdToast.show(
					$mdToast.simple()
					.textContent(message)
					.hideDelay(3000)
					);
			};

			$scope.register = function() {
				$scope.message = null;
				$scope.error = null;

				var substring = "@mumail.ie";
				var email = $scope.email;

				var username = email.substr(0, 16).replace('.',' ');
				console.log(username);

				function check_email(email) {
					if(email == null) { 
						return false; 
					}
					else if(email.indexOf(substring) !== -1) {
						return true;
					} 
					else return false;
				};

				if(check_email(email) == true) {

					Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
					.then(function(firebaseUser) {

						Data
						.child('users')
						.child(firebaseUser.uid)
						.set({
							username: username,
							email: firebaseUser.email,
						})

						toast('Sending email verification email now, check your inbox!');
						firebaseUser.sendEmailVerification();

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

				function isEmail(email) {
					var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					return regex.test(email);
				}

				if (isEmail($scope.email)) {
					Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
					.then(function(firebaseUser) {
						if (!firebaseUser.emailVerified) {
							toast('Your email is not verified');
							$state.go('login');
						} else { 
							$state.go('home'); 
							toast("You've been signed in");
						};
					}).catch(function(error) {
						toast(error.message);
					});
				}
				else { toast("Not a valid email address"); };
			}
		};
	}
	
})();