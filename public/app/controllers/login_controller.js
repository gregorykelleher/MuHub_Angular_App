(function(){
	angular
	.module('main')
	.controller('login_controller', [login_controller]);

	function login_controller() {
		var self = this;
		self.login = login;

		function login($scope, Auth, Data, toast, $state) {

			// func to separate email components
			function GetEmailParts(email){
				var objParts = {
					user: null,
					firstName: null,
					LastName: null,
					domain: null,
					tld: null
				};
				email.replace( 
					new RegExp("^([a-z\\d._%-]+)@((?:[a-z\\d-]+\\.)+)([a-z]{2,6})$", "i"),
					function($0,$1,$2,$3) {
						objParts.user = $1;  
						if ($1.length > 1) {
							$1 = $1.split(".");
							for(var i = 0; i < $1.length; i++){
								$1[i] = $1[i].substring(0,1).toUpperCase() + $1[i].substring(1,$1[i].length);
							}
							objParts.firstName = $1[0];
							objParts.lastName = $1[1];
						};
						objParts.domain = $2;
						objParts.tld = $3;
					});
				return(objParts);
			}

			$scope.register = function() {
				$scope.message = null;
				$scope.error = null;

				var email = $scope.email;
				email = GetEmailParts(email);

				first_name = email.firstName;
				last_name = email.lastName;

				// check if valid mumail email
				function check_email(email) {
					if(email === null) { 
						return false; 
					}
					else if(email.domain === "mumail.") {
						return true;
					} 
					else return false;
				};

				if(check_email(email) == true) {

					Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
					.then(function(firebaseUser) {
						// add user data to firebase
						Data
						.child('users')
						.child(firebaseUser.uid)
						.set({
							first_name: first_name,
							last_name: last_name,
							id: firebaseUser.uid,
							email: firebaseUser.email,
						})

						toast.display('Sending email verification email now, check your inbox!');
						firebaseUser.sendEmailVerification();

					}).catch(function(error) {
						$scope.error = error.message;
						toast.display($scope.error);
					});
				}
				else if(check_email(email) == false) {
					toast.display("Not a valid '@mumail' account");
				}
			}

			$scope.sign_in_anon = function() {
				Auth.$signInAnonymously().then(function(firebaseUser) {

					$state.go('home'); 
					toast.display("You've been signed in as a guest");
					$scope.firebaseUser = firebaseUser;

				}).catch(function(error) {
					toast.display(error.message);
				});
			}

			$scope.sign_in = function() {
				$scope.message = null;
				$scope.error = null;

				function isEmail(email) {
					// regex func to validate authentic email
					var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					return regex.test(email);
				}

				if (isEmail($scope.email)) {
					Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
					.then(function(firebaseUser) {
						if (!firebaseUser.emailVerified) {
							toast.display('Your email has not been verified yet');
							$state.go('login');
						} else { 
							$state.go('home'); 
							toast.display("You've been signed in");
						};
					}).catch(function(error) {
						toast.display(error.message);
					});
				}
				else { toast.display("Not a valid email address"); };
			}
		};
	}
	
})();