angular.module('SignupCtrl', []).controller('SignupController', ['$scope', '$rootScope', '$injector', function ($scope, $rootScope, $injector) {
	'use strict';

	// Register the signup() function
	$scope.signup = function () {
		var $state = $injector.get('$state');
		var $http = $injector.get('$http');

		$http.post('/signup', {
				email: $scope.email,
				password: $scope.password,
			})
			.success(function (data) {
				// No error: authentication OK
				$rootScope.message = '';
				$rootScope.user = {
					email: $scope.email,
					password: $scope.password
				};
				$state.go('profile');
			})
			.error(function (message) {
				// Error: authentication failed
				$rootScope.message = message;
				$state.go('signup');
			});
	};
}]);
