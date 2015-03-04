var app = angular.module('awesomeBoardApp', ['ui.router', 'LoginCtrl', 'SignupCtrl', 'ProfileCtrl']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
	'use strict';

	// Check if the user is logged in.
	var checkLoggedin = function ($q, $timeout, $injector, $rootScope) {
		var $state = $injector.get('$state');
		var $http = $injector.get('$http');

		// Initialize a new promise.
		var deferred = $q.defer();
		// Make an AJAX call to check if the user is logged in.
		$http.get('/loggedin').success(function (user) {
			if (user !== '0') // Authenticated
				deferred.resolve();
			else { // Not Authenticated
				$rootScope.message = 'You need to log in.';
				deferred.reject();
				$state.go('login');
			}
		});
		return deferred.promise;
	};

	// Add an interceptor for AJAX errors.
	$httpProvider.interceptors.push(function ($q, $injector) {
		return {
			response: function (response) {
				// Do something on success.
				return response;
			},
			responseError: function (response) {
				if (response.status === 401) {
					var $state = $injector.get('$state');
					$state.go('login');
				}
				return $q.reject(response);
			}
		};
	});

	// Set up states and routes.
	$stateProvider.state('home', { // Home page
			url: '/',
			templateUrl: 'views/home.html',
		})
		.state('signup', { // Signup form
			url: '/signup',
			templateUrl: 'views/signup.html',
			controller: 'SignupController'
		})
		.state('login', { // Login form
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.state('profile', { // Profile page
			url: '/profile',
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
			resolve: { // Only show if logged in.
				loggedin: checkLoggedin
			}
		});

	$urlRouterProvider.otherwise('/'); // For any unmatched url, redirect to home.

	$locationProvider.html5Mode(true); // Gets rid of ugly # in route.
}]);

app.run(['$rootScope', '$injector', function ($rootScope, $injector) {
	'use strict';
	$rootScope.message = ''; // For storing login messages
	$rootScope.title = 'awesomeBoard'; // Browser title

	// Logout function is available in any page.
	$rootScope.logout = function () {
		var $state = $injector.get('$state');
		var $http = $injector.get('$http');
		$http.post('/logout');
		$state.go('home');
	};
}]);
