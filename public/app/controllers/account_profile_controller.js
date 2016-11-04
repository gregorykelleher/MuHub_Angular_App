(function(){
	angular
	.module('main')
	.controller('account_profile_controller', [account_profile_controller]);

	function account_profile_controller() {
		var self = this;
		self.account_profile = account_profile;

		function account_profile($scope) {
			
		};
	}
	
})();