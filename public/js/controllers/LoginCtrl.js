angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$rootScope', '$injector', function ($scope, $rootScope, $injector) {
	'use strict';

	// Register the login() function
	$scope.login = function () {
		var $state = $injector.get('$state');
		var $http = $injector.get('$http');

		$http.post('/login', {
				email: $scope.email,
				password: $scope.password
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
				$state.go('login');
			});
	};
}]);
