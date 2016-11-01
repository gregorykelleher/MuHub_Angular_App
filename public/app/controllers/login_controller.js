(function(){
	angular
	.module('main')
	.controller('login_controller', [login_controller]);

	function login_controller() {
		var self = this;
		self.auth = auth;

		function auth($scope) {

		};
	}

})();