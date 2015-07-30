angular.module('ProfileCtrl', []).controller('ProfileController', ['$rootScope', '$scope', '$http', 'socket', function ($rootScope, $scope, $http, socket) {
	'use strict';

	$http.get('/loggedin')
	.success(function (user) {
		$rootScope.user = user.local;
		$rootScope.message = '';
	});

	socket.on('news', function (data) {
		console.log(data);
		socket.emit('my other event', {
			my: 'data'
		});
	});

	$scope.pushButton = function () {
		socket.emit('get user', function (user) {
			console.log(user);
		});
	};
}]);
