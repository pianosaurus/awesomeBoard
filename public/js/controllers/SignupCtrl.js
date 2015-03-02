angular.module('SignupCtrl', []).controller('SignupController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
	'use strict';

	// Register the signup() function
	$scope.signup = function () {
		console.log('Signup');
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
				$location.url('/profile');
			})
			.error(function (data) {
				// Error: authentication failed
				$rootScope.message = data;
				$location.url('/signup');
			});
	};
}]);
