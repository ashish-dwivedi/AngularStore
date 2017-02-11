(function() {
	"use strict";
	
	angular.module('Store.Home', ['Store.Home.Controller'])
	.config(HomeConfig);
	
	HomeConfig.$inject = ['$routeProvider'];
	function HomeConfig($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'modules/home/home.html',
			controller: 'HomeController',
			controllerAs: 'hvm'
		})
		.otherwise({redirectTo: '/'})
	}
})();