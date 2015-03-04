angular.module('ProfileCtrl', []).controller('ProfileController', ['$rootScope', '$http', function ($rootScope, $http) {
	'use strict';

	$http.get('/loggedin')
	.success(function (user) {
		$rootScope.user = user.local;
		$rootScope.message = '';
	});

}]);
