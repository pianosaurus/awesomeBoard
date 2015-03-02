var app = angular.module('awesomeBoardApp', ['ui.router', 'SignupCtrl', 'LoginCtrl', 'ProfileCtrl']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
	'use strict';

	// Check if the user is logged in:
	var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
		console.log('checkLoggedin');
		// Initialize a new promise
		var deferred = $q.defer();
		// Make an AJAX call to check if the user is logged in
		$http.get('/loggedin').success(function (user) {
			// Authenticated
			if (user !== '0')
				deferred.resolve();
			// Not Authenticated
			else {
				$rootScope.message = 'You need to log in.';
				deferred.reject();
				$location.url('/login');
			}
		});
		return deferred.promise;
	};

	// Add an interceptor for AJAX errors
	$httpProvider.interceptors.push(function ($q, $location) {
		console.log('intercepted');
		return {
			response: function (response) {
				// do something on success
				return response;
			},
			responseError: function (response) {
				if (response.status === 401)
					$location.url('/login');
				return $q.reject(response);
			}
		};
	});

	// Set up states and routes.
	$stateProvider.state('home', { // home page
			url: '/',
			templateUrl: 'views/home.html',
//			controller: 'MainController'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'views/signup.html',
			controller: 'SignupController'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
			resolve: {
				loggedin: checkLoggedin
			}
		});

	$urlRouterProvider.otherwise('/'); // For any unmatched url, redirect to /

	$locationProvider.html5Mode(true);
}]);

app.run(function ($rootScope, $http) {
	'use strict';
	$rootScope.message = ''; // For storing login messages
	$rootScope.title = 'awesomeBoard'; // Browser title
	// Logout function is available in any pages
	$rootScope.logout = function () {
		$rootScope.message = 'Logged out.';
		$http.post('/logout');
	};
});
