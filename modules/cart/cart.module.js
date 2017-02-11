(function() {
	"use strict";
	
	angular.module('Cart', ['Cart.Controller'])
	.config(HomeConfig);
	
	HomeConfig.$inject = ['$routeProvider'];
	function HomeConfig($routeProvider) {
		$routeProvider.when('/cart', {
			templateUrl: 'modules/cart/cart.html',
			controller: 'CartController',
			controllerAs: 'cvm'
		})
		.otherwise({redirectTo: '/'})
	}
})();