(function() {
	"use strict";
	
	angular.module('Item.Details', ['Item.Details.Controller'])
	.config(HomeConfig);
	
	HomeConfig.$inject = ['$routeProvider'];
	function HomeConfig($routeProvider) {
		$routeProvider.when('/details', {
			templateUrl: 'modules/item-details/details.html',
			controller: 'ItemDetailsController',
			controllerAs: 'idvm'
		})
		.otherwise({redirectTo: '/'})
	}
})();