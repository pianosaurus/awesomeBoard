angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
	'use strict';

	// Register the login() function
	$scope.login = function () {
		console.log('Login');
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
				$location.url('/profile');
			})
			.error(function (data) {
				// Error: authentication failed
				$rootScope.message = data;
				$location.url('/login');
			});
	};
}]);
